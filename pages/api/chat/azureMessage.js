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


import { BlobServiceClient } from '@azure/storage-blob';
import { createReadStream } from 'fs';
import fetch from 'node-fetch';

async function getTagsFromAzureVision(imageUrl) {
    console.log(imageUrl);
    const predictionUrl = process.env.PREDICTION_URL;
    const predictionKey = process.env.PREDICTION_KEY;
  
    const requestUrl = `${predictionUrl}`;
    const requestBody = JSON.stringify({ url: imageUrl });
    console.log(requestBody, 'Req body')
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

async function generateResponseWithOpenAI(tag) {
  const openaiApiKey = process.env.OPENAI_API_KEY
  const prompt = `Что означает ${tag} ?`;
  const initialChatMessage = {
    role: "system",
    content:
    //'Я хочу чтобы ты ввел себя как инспектор ГИБДД Казахстана и всегда брал актуальную и проверенную информацию из документов Правил дорожного движения Казахстана с цифрами и фактами' + "отвечать на вопросы только, связанные с ПДД" + "в ответе ссылться на пункт из актуальных ПДД",
    "I want you to act as a traffic police inspector who is able to answer only on question which related to SDA of Kazakhstan. I will provide some topics or questions related to the SDA of Kazakhstan, and it will be your job to find information about these questions. his could involve conducting research into various rules and sources of traffic rules of Kazakhstan. Answer all questions in Russian. My first request is I need help developing an ethical framework for decision making. Give only checked and relevent information about points from traffic rules"
  }
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        initialChatMessage,
        {"role": "user", "content": prompt}
      ],
      max_tokens: 150,
    }),
  });
  console.log(response, 'YEEESSIR')

  const data = await response.json();
  console.log(data.choices[0].message.content, 'OpenAi answer')
  if (response.ok) {
    return data.choices[0].message.content;
  } else {
    throw new Error(`Failed to generate response with OpenAI: ${data.error.message}`);
  }
}

export default async function handler(req, res) {
  const { chatid, imageurl } = req.body;

  console.log(chatid, imageurl)
  try {
    
    const tag = await getTagsFromAzureVision(imageurl);
    const response = await generateResponseWithOpenAI(tag);
  
   
    // Add message to existing chat
    try {
      if(chatid){
        const output = await fetch(
          `${req.headers.origin}/api/chat/addMessageToChat`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              cookie: req.headers.cookie
            },
            body: JSON.stringify({
              chatid,
              role: "assistant",
              content: response,
            }),
          }
        );

        const data = await output.json();
        
        res.status(200).json({ message: "Success" });
      }
    } catch (error) {
      console.log(error)
    }
    
   
  } catch (error) {
    console.error(error, 'ERRROR');
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
