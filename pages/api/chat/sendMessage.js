// import { OpenAIEdgeStream } from "openai-edge-stream";
// import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
// import { ApiKeyCredentials } from "@azure/ms-rest-js";


// export const config = {
//   runtime: "edge",
// };



// export default async function handler(req) {
//   try {
//     const { chatId: chatIdFromParam, message } = await req.json();

//     // validate message data
//     if (!message || typeof message !== "string" || message.length > 200) {
//       return new Response(
//         {
//           message: "message is required and must be less than 200 characters",
//         },
//         {
//           status: 422,
//         }
//       );
//     }

//     let chatId = chatIdFromParam;

//     const initialChatMessage = {
//       role: "system",
//       content:
//       //'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и всегда брал актуальную и проверенную информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД" + "в ответе ссылться на пункт из актуальных ПДД",
//       "I want you to act as a traffic police inspector who is able to answer only on question which related to SDA of Kazakhstan. I will provide some topics or questions related to the SDA of Kazakhstan, and it will be your job to find information about these questions. his could involve conducting research into various rules and sources of traffic rules of Kazakhstan. Answer all questions in Russian. My first request is I need help developing an ethical framework for decision making. Give only checked and relevent information about points from traffic rules"
//     }

//     let newChatId;
//     let chatMessages = [];
//     console.log(`${req.headers.get("origin")}/api/chat/addMessageToChat`)
//     if (chatId) {
     
//       // add message to chat
//       console.log(`${req.headers.get("origin")}/api/chat/addMessageToChat`, 'from chatId')
//       const response = await fetch(
//         `${req.headers.get("origin")}/api/chat/addMessageToChat`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             cookie: req.headers.get("cookie"),
//           },
//           body: JSON.stringify({
//             chatId,
//             role: "user",
//             content: message, //meaning of question, not his appearance
//           }),message
//         }

//       );
        
//       console.log(response.status, 'from sendmes')
//       const json = await response.json();
     
//       chatMessages = json.chat.messages || [];
//     } else {
//       const response = await fetch(
//         `${req.headers.get("origin")}/api/chat/createNewChat`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             cookie: req.headers.get("cookie"),
//           },
//           body: JSON.stringify({
//             message,
//           }),
//         }
//       );
     

//       const json = await response.json();

//       chatId = json._id;
//       newChatId = json._id;
//       chatMessages = json.messages || [];
//     }

//     const messagesToInclude = [];
//     chatMessages.reverse();
//     let usedTokens = 0;
//     for (let chatMessage of chatMessages) {
//       const messageTokens = chatMessage.content.length / 4;
//       usedTokens = usedTokens + messageTokens;
//       if (usedTokens <= 1000) {
//         messagesToInclude.push(chatMessage);
//       } else {
//         break;
//       }
//     }

//     messagesToInclude.reverse();

//     const stream = await OpenAIEdgeStream(
//       "https://api.openai.com/v1/cfullContenthat/completions",
//       {
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//         method: "POST",
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [initialChatMessage, ...messagesToInclude],
//           stream: true,
//         }),
//       },
//       {
//         onBeforeStream: async ({ emit }) => {
         
//           console.log('before stream')
//           if (newChatId) {
//             emit(chatId, "newChatId");
//           }

          
//         },

//         onAfterStream: async ({ emit, fullContent }) => {
          
          
//           try {
//             if (chatId) {
//               console.log('started openai')
//               // Add message to existing chat
//               const response = await fetch(
//                 `${req.headers.get("origin")}/api/chat/addMessageToChat`,
//                 {
//                   method: "POST",
//                   headers: {
//                     "content-type": "application/json",
//                     cookie: req.headers.get("cookie"),
//                   },
//                   body: JSON.stringify({
//                     chatId,
//                     role: "assistant",
//                     content: fullContent,
//                   }),
//                 }

                
//               );
            
              
//               if (!response.ok) {
         
//        throw new Error("Failed to add message to chat");
//               }
              
              
//             } else {
//               // Create a new chat
//               const response = await fetch(
//                 `${req.headers.get("origin")}/api/chat/createNewChat`,
//                 {
//                   method: "POST",
//                   headers: {
//                     "content-type": "application/json",
//                     cookie: req.headers.get("cookie"),
//                   },
//                   body: JSON.stringify({
//                     message,
//                   }),
//                 }
//               );
              
//               if (!response.ok) {
//                 throw new Error("Failed to create a new chat");
//               }
              
              
//             }
//           } catch (error) {
//             console.error("An error occurred:", error);
//           }
//         },
        
        
//       }
//     );

//     return new Response(stream);
//   } catch (e) {

//     return new Response(
//       {
//         message: "an error occurred in sendMessage",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }




import { OpenAIEdgeStream } from "openai-edge-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  try {
    const { chatId: chatIdFromParam, message } = await req.json();

    // validate message data
    if (!message || typeof message !== "string" || message.length > 200) {
      return new Response(
        {
          message: "message is required and must be less than 200 characters",
        },
        {
          status: 422,
        }
      );
    }

    let chatId = chatIdFromParam;

    const initialChatMessage = {
      role: "system",
      content:
      'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и отвечал на русском языке и всегда брал информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД" + "в ответе ссылться на пункт из ПДД",
    };

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
            content: message,
          }),
        }
      );
      console.log(response.status, 'Reponse');
      const json = await response.json();
      chatMessages = json.chat.messages || [];
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
            message,
          }),
        }
      );
      console.log(message, chatId, 'FROM CHATGPT')

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
        messagesToInclude.push(chatMessage);
      } else {
        break;
      }
    }

    messagesToInclude.reverse();

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
          messages: [initialChatMessage, ...messagesToInclude],
          stream: true,
        }),
      },
      {
        onBeforeStream: async ({ emit }) => {
          console.log(chatId, 'Chat')
          if (newChatId) {
            emit(chatId, "newChatId");
          }

          
        },
        onAfterStream: async ({ emit, fullContent }) => {
          console.log(fullContent, 'content', typeof(fullContent));
          
          try {
            if (chatId) {
              console.log('starting adding messages')
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
                `${req.headers.get("origin")}/api/chat/createNewChat`,
                {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    cookie: req.headers.get("cookie"),
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