// import { NextResponse } from 'next/server'
// import { PineconeClient } from '@pinecone-database/pinecone'
// import { TextLoader } from 'langchain/document_loaders/fs/text'
// import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
// import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// import {
//   createPineconeIndex,
//   updatePinecone
// } from '../../../utils'
// import { indexName } from '../../../config'

// export const config = {
//   runtime: "edge",
// };

// export default async function handler(){
//   console.log('start btw')
//   const loader = new DirectoryLoader('./documents', {
//     ".txt": (path) => new TextLoader(path),
//     ".md": (path) => new TextLoader(path),
//     ".pdf": (path) => new PDFLoader(path)
//   })

//   const docs = await loader.load()
//   const vectorDimensions = 1536

//   const client = new PineconeClient()
//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY || '',
//     environment: process.env.PINECONE_ENVIRONMENT || ''
//   })

//   try {
//     await createPineconeIndex(client, indexName, vectorDimensions)
//     await updatePinecone(client, indexName, docs)
    
//   } catch (err) {
//     console.log("help error pls")
//     console.log('error: ', err)
//   }

//   return NextResponse.json({
//     data: 'successfully created index and loaded data into pinecone...'
//   })
// } 


import { NextResponse } from 'next/server';
import { PineconeClient } from '@pinecone-database/pinecone';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { createPineconeIndex, updatePinecone } from '../../../utils';
import { indexName } from '../../../config';

export const config = {
  runtime: "edge",
};

export default async function handler() {
  if (typeof window === 'undefined') {
    // This code will only run on the server-side

    const loader = new DirectoryLoader('./documents', {
      ".txt": (path) => new TextLoader(path),
      ".md": (path) => new TextLoader(path),
      ".pdf": (path) => new PDFLoader(path)
    });

    const docs = await loader.load();
    const vectorDimensions = 1536;

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENVIRONMENT || ''
    });

    try {
      await createPineconeIndex(client, indexName, vectorDimensions);
      await updatePinecone(client, indexName, docs);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return NextResponse.json({
    data: 'successfully created index and loaded data into pinecone...'
  });
}
