import { OpenAIEdgeStream } from "openai-edge-stream";
import { OpenAIApi, Configuration } from 'openai';

import {GoogleCustomSearch} from 'langchain/tools'
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DynamicTool } from "langchain/tools";



export const config = {
  runtime: "edge",
};

function getFullContentString() {
  // You can return any JSON string you want here
  return JSON.stringify({ key: "value", anotherKey: "anotherValue" });
}

export default async function handler(req) {
  console.log(req.body, 'From text')
  const messagesToInclude = [];
  try {
    const { chatId: chatIdFromParam, message: user_input } = await req.json();

    console.log(user_input, 'user_input')
    // validate user_input data
    if (!user_input || typeof user_input !== "string" || user_input.length > 200) {
      return new Response(
        {
          user_input: "user_input is required and must be less than 200 characters",
        },
        {
          status: 422,
        }
      );
    }

    let chatId = chatIdFromParam;
    
    const initialChatMessage =     {
      role: "system",
      name: "undefined",
      
      content: "You are a traffic police inspector of Kazakhstan and you help users to find out information about the current situation of traffic rules. Answer only questions related to traffic rules, cars, and applying for a driver's license. Otherwise, say that you cannot answer these questions",
    }

    let newChatId;
    let chatMessages = [];

    if (chatId) {
      console.log('starting adding messages')
      // add message to chat
      const response = await fetch(
        `${req.headers.get("origin")}/api/chat/addMessageToChat`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: req.headers.get("cookie"),
          },
          body: JSON.stringify({
            chatId,
            role: "user",
            content: user_input,
          }),
        }
      );
      
      const json = await response.json();
      console.log(json, 'json messages')
      chatMessages = json.chat.messages || [];
      chatMessages.push({
        role: "user",
        content: user_input
      })
    } else {
      const response = await fetch(
        `${req.headers.get("origin")}/api/chat/createNewChat`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            cookie: req.headers.get("cookie"),
          },
          body: JSON.stringify({
            message: user_input,
          }),
        }
      );

      

      const json = await response.json();

      chatId = json._id;
      newChatId = json._id;
      chatMessages = json.messages || [];
      chatMessages.push({
        role: "user",
        content: user_input
      })
    }


    // declare functions for function calling
    const functions = [
      {
        name: 'answer_question',
        description:
          'Call this function for most of questions related to car management and applying for a driving license in Kazakhstan',
        parameters: {
          type: 'object',
          properties: {
            user_input: {
              type: 'string',
              description: "User's input",
            },
          },
          required: ['user_input'],
        },
      },
      {
        name: 'pdd_search',
        description:
          'Call this function to answe ONLY questions related to traffic rules the Republic of Kazakhstan',
        parameters: {
          type: 'object',
          properties: {
            text_for_search: {
              type: 'string',
              description:
                'Text that will be used for search in the vector database of traffic rules of the Republic of Kazakhstan',
            },
          },
          required: ['text_for_search'],
        },
      },
    ];



    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const pinecone = new PineconeClient()
    console.log('Pinecone client')
    await pinecone.init({
        environment: process.env.PINECONE_ENV,
        apiKey: process.env.PINECONE_API_KEY
    })
    const embedding = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  // const index = pinecone.Index('langchain')
  // const pineconeStore = new PineconeStore(embedding, { pineconeIndex: index, namespace: 'langchain' })
  //   console.log('Pinecone set up')


    const answer_question = async (user_input) => {
      const search = new GoogleCustomSearch({apiKey: process.env.GOOGLE_API_KEY, googleCSEId:  process.env.GOOGLE_CSE_ID});
      const tool = new DynamicTool({
          name: "Answer questions related to traffic rules",
          description:
            "Search information about how to apply for driver's license only in Kazakhstan and driving moments",
          func: async () => await search._call(user_input)
        })
      const res =
        'USE THIS INFORMATION TO ANSWER: ' + (await tool._call(user_input));
      return res;
    }

    const pdd_search = async (text_for_search) =>  {
      console.log(text_for_search, 'text');
     

      return 'USE YOUR OWN KNOWLEDGE TO ANSWER THIS QUESTION';
      
    }


    

    messagesToInclude.push({
      role: "user",
      content: user_input
      
    })
    // chatMessages.reverse();
    // console.log(chatMessages, 'chat messages')
    // let usedTokens = 0;
    // for (let chatMessage of chatMessages) {
    //   const messageTokens = chatMessage.content.length / 4;
    //   usedTokens = usedTokens + messageTokens;
    //   if (usedTokens <= 1000) {
    //     messagesToInclude.push(chatMessage);
    //     console.log(messagesToInclude.splice(-5), 'after chatMessage')
    //   } else {
    //     break;
    //   }
    // }



    try {
      console.log('start')
      
      const response = await fetch("https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [initialChatMessage, ...messagesToInclude],
          functions: functions,
          function_call: "auto"
        }),
      })
     
  
      
      const res = await response.json()
     


      const message = res['choices'][0]['message']; // дело в этом сообщении, я хз как это исправить
      console.log(message, "Message before getting arguments")
      messagesToInclude.push(message);
      console.log(messagesToInclude, 'Message to Include')
      if ('function_call' in message) {
          const  function_name = message.function_call.name;
  
          let function_to_call = null;
          for (const func of functions) {
            if (func['name'] === function_name) {
              function_to_call = func['name'];
              break;
            }

          }
          
         
          const function_args = JSON.parse(message.function_call.arguments);
          console.log(function_args, 'Arguments ')
     
          let function_response = null;
          if (function_name === 'pdd_search') {
            console.log(user_input, 'User input in function call')
            function_response = await pdd_search(user_input);
            console.log(function_response, 'func res');
          } else if (function_name === 'answer_question') {
            function_response = await answer_question(function_args['user_input']);
            console.log(function_response, 'Function response');
          } else {
            console.log('error');
          }
          
          console.log(function_response, 'Response please')
          messagesToInclude.push({
            role: 'function',
            name: function_name,  
            content: function_response,
          });
          console.log(messagesToInclude, 'function name')
      }
      
        
    } catch (e) {
      console.log('....')
      throw new HttpException('Error', e);
    }
  
    
    //console.log([initialChatMessage, ...messagesToInclude.slice(-5)], 'Messages to Include after all operations')
    const stream = await OpenAIEdgeStream(

      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          // messages: [
          //   {
          //   role: 'system',
          //   name: 'undefined',
          //   content: 'You are a traffic police inspector of Kazakhstan and you help users to find out information about the current situation of traffic rules. Answer only questions related to traffic rules, cars, and applying for a driver\'s license. Otherwise, say that you cannot answer these questions'
          // },
          //   { role: 'user', content: 'Что такое автомобиль' },
          //   {
          //   role: 'assistant',
          //   content: 'Автомобиль - это транспортное средство, предназначенное для перевозки людей или грузов. Он обычно оснащен двигателем, колесами и средствами управления, такими как руль и педали тормоза и газа. Автомобили могут быть разных типов, включая легковые автомобили, грузовики, автобусы и мотоциклы. В Казахстане для управления автомобилем необходимо иметь водительское удостоверение.'
          // }
          // ] ,
          messages: [initialChatMessage, ...messagesToInclude.slice(-5)],
          stream: true,
          temperature: 0.2
        }),
      },
    
      {
        onBeforeStream: async ({ emit }) => {
          console.log([initialChatMessage, ...messagesToInclude.slice(-10)], 'Include')
          if (newChatId) {
            emit(chatId, "newChatId");
          }

          
        },
        onAfterStream: async ({ emit, fullContent }) => {
          console.log('start this shit')
          console.log(fullContent, 'content', typeof(fullContent));
          
          try {
            if (chatId) {
              console.log('starting adding messages after stream')
              // Add message to existing chat
              const response = await fetch(
                `${req.headers.get("origin")}/api/chat/addMessageToChat`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    cookie: req.headers.get("cookie"),
                  },
                  body: JSON.stringify({
                    chatId,
                    role: "assistant",
                    content: fullContent
                  }),
                }
              );
              
              if (!response.ok) {
                throw new Error("Failed to add message to chat");
              }
              
              console.log(response.status);
            } else {
              // Create a new chat
              const response = await fetch(
                `${req.headers.get("origin")}/api/chat/createNewChat`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    cookie: req.headers.get("cookie"),
                  },
                  body: JSON.stringify({
                    message: user_input // there was a message btw
                  }),
                }
              );
              
              if (!response.ok) {
                throw new Error("Failed to create a new chat");
              }
              
              console.log(fullContent, chatId, 'FROM CHATGPT');
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        },
        
        
      }
    );
    console.log(stream, 'STREAM')

    return new Response(stream);
  } catch (e) {
    console.log("an error occurred in sendmessage ", e);
    return new Response(
      {
        message: "an error occurred in sendMessage",
      },
      {
        status: 500,
      }
    );
  }
}