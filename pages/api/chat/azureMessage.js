// import { BlobServiceClient } from '@azure/storage-blob';
// import { createReadStream } from 'fs';
// import fetch from 'node-fetch';

// async function getTagsFromAzureVision(imageUrl) {
//     console.log(imageUrl);
//     const predictionUrl = process.env.PREDICTION_URL;
//     const predictionKey = process.env.PREDICTION_KEY;
  
//     const requestUrl = `${predictionUrl}`;
//     const requestBody = JSON.stringify({ url: imageUrl });
//     console.log(requestBody, 'Req body')
//     const response = await fetch(requestUrl, {
//       method: 'POST',
//       headers : {
//         "Content-Type": "application/json",
//         "Prediction-Key": predictionKey
//       },
//       body: requestBody,
//     });
  
//     const data = await response.json();
//     console.log(data, 'data')
//     if (response.ok) {
//         console.log(data.predictions[0].tagName, 'RES from azure');
//       return data.predictions[0].tagName
//     } else {
//       throw new Error(`Failed to get tags from Azure Vision API: ${data.message}`);
//     }
//   }

// async function generateResponseWithOpenAI(tag) {
//   const openaiApiKey = process.env.OPENAI_API_KEY
//   const prompt = `Что означает ${tag} ?`;
//   const initialChatMessage = {
//     role: "system",
//     content:
//     //'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и всегда брал актуальную и проверенную информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД" + "в ответе ссылться на пункт из актуальных ПДД",
//     "I want you to act as a traffic police inspector who is able to answer only on question which related to SDA of Kazakhstan. I will provide some topics or questions related to the SDA of Kazakhstan, and it will be your job to find information about these questions. his could involve conducting research into various rules and sources of traffic rules of Kazakhstan. Answer all questions in Russian. My first request is I need help developing an ethical framework for decision making. Give only checked and relevent information about points from traffic rules"
//   }
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${openaiApiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [
//         initialChatMessage,
//         {"role": "user", "content": prompt}
//       ],
//       max_tokens: 150,
//     }),
//   });
//   console.log(response, 'YEEESSIR')

//   const data = await response.json();
//   console.log(data.choices[0].message.content, 'OpenAi answer')
//   if (response.ok) {
//     return data.choices[0].message.content;
//   } else {
//     throw new Error(`Failed to generate response with OpenAI: ${data.error.message}`);
//   }
// }

// export default async function handler(req, res) {
//   const { chatid, imageurl } = req.body;

//   console.log(chatid, imageurl)
//   try {
    
//     const tag = await getTagsFromAzureVision(imageurl);
//     const response = await generateResponseWithOpenAI(tag);
//     console.log(tag, 'TAGS');
//     // TODO: Send the `response` back to the chat with the given `chatid`

//     res.status(200).json({ response });
   
//   } catch (error) {
//     console.error(error, 'ERRROR');
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

async function getTagsFromAzureVision(imageUrl) {
    console.log(imageUrl, 'imageurl');
    const predictionUrl = process.env.PREDICTION_URL;
    const predictionKey = process.env.PREDICTION_KEY;
  
    const requestUrl = `${predictionUrl}`;
    const requestBody = JSON.stringify({ url: imageUrl });
    console.log(requestBody, 'REQ Body')
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers : {
        "Content-Type": "application/json",
        "Prediction-Key": predictionKey
      },
      body: requestBody,
    });
  
    const data = await response.json();
    console.log(data, 'data')
    if (response.ok) {
        console.log(data.predictions[0].tagName, 'RES from azure');
      return data.predictions[0].tagName
    } else {
      throw new Error(`Failed to get tags from Azure Vision API: ${data.message}`);
    }
}

async function generateResponseWithOpenAI(tag, image, chatId, req, res) {
  const openaiApiKey = process.env.OPENAI_API_KEY
  const prompt = `Что означает ${tag} ?`;
  // const initialChatMessage = {
  //   role: "system",
  //   content:
  //   //'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и всегда брал актуальную и проверенную информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД" + "в ответе ссылться на пункт из актуальных ПДД",
  //   "I want you to act as a traffic police inspector who is able to answer only on question which related to SDA of Kazakhstan. I will provide some topics or questions related to the SDA of Kazakhstan, and it will be your job to find information about these questions. his could involve conducting research into various rules and sources of traffic rules of Kazakhstan. Answer all questions in Russian. My first request is I need help developing an ethical framework for decision making. Give only checked and relevent information about points from traffic rules"
  // }
  const initialChatMessage = {
    role: "system",
    content:
    'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и отвечал на русском языке и всегда брал информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД",
  };

  let newChatId;
  let chatMessages = [];

  if (chatId) {
    console.log('starting adding messages')
    // add message to chat
    const response = await fetch(
      `http://localhost:3000/api/chat/addMessageToChat`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: req.headers.get("cookie"),
        },
        body: JSON.stringify({
          chatId,
          role: "user",
          content: image, // meaning
        }),
      }
    );
    console.log(response.status, 'Reponse');
    const json = await response.json();
    chatMessages = json.chat.messages || [];
  } else {
    const response = await fetch(
      `${req.headers.get("origin")}/api/chat/addMessageToChat`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          cookie: req.headers.cookie,
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );
    

    const json = await response.json();

    chatId = json._id;
    newChatId = json._id;
    chatMessages = json.messages || [];
  }

  const messagesToInclude = [];
  chatMessages.reverse();
  let usedTokens = 0;
  for (let chatMessage of chatMessages) {
    const messageTokens = chatMessage.content.length / 4;
    usedTokens = usedTokens + messageTokens;
    if (usedTokens <= 1000) {
      messagesToInclude.push(prompt);
    } else {
      break;
    }
  }

  messagesToInclude.reverse();
  console.log(messagesToInclude, 'messages')
  let prompt_message = {
    role: "user",
    content: prompt
  }

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
        messages: [initialChatMessage, prompt_message],
        stream: true,
      }),
    },
    {
      onBeforeStream: async ({ emit }) => {
        console.log('Before stream')
        if (newChatId) {
          emit(chatId, "newChatId");
        }

        
      },
      onAfterStream: async ({ emit, fullContent }) => {
        console.log(fullContent, 'content',);
        
        try {
          if (chatId) {
            console.log('starting adding messages after streaming')
            // Add message to existing chat
            const response = await fetch(
              `${req.headers.get("origin")}/api/chat/addMessageToChat`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  cookie: req.headers.get("cookie")
                },
                body: JSON.stringify({
                  chatId,
                  role: "assistant",
                  content: fullContent,
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
              `${req.headers.origin}/api/chat/createNewChat`,
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  cookie: req.headers.cookie,
                },
                body: JSON.stringify({
                  message,
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

    return new Response(stream);
  }

  
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${openaiApiKey}`,
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       initialChatMessage,
  //       {"role": "user", "content": prompt}
  //     ],
  //     max_tokens: 150,
  //   }),
  // });
  // console.log(response, 'YEEESSIR')

  // const data = await response.json();
  // console.log(data.choices[0].message.content, 'OpenAi answer')
  // if (response.ok) {
  //   return data.choices[0].message.content;
  // } else {
  //   throw new Error(`Failed to generate response with OpenAI: ${data.error.message}`);
  // }


export default async function handler(req, res) {
  const { chatid, imageurl } = await req.json();

  console.log(chatid, imageurl, 'params')
  try {
    
    const tag = await getTagsFromAzureVision(imageurl);
    console.log(tag, 'TAG')
    const response = await generateResponseWithOpenAI(tag, imageurl, chatid, req, res);
  
    
   
    // Add message to existing chat
    // try {
    //   if(chatid){
    //     const output = await fetch(
    //       `${req.headers.origin}/api/chat/addMessageToChat`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "content-type": "application/json",
    //           cookie: req.headers.cookie
    //         },
    //         body: JSON.stringify({
    //           chatid,
    //           role: "assistant",
    //           content: response,
    //         }),
    //       }
    //     );

    //     const data = await output.json();
        
    //     res.status(200).json({ message: "Success" });
    //   }
    // } catch (error) {
    //   console.log(error)
    //   res.status(500).json({ message: "Internal Server Error" });
    // }
    return response
    
   
  } catch (error) {
    console.error(error, 'ERRROR');
    // res.status(500).json({ error: 'Internal Server Error' });
  }
  
}
