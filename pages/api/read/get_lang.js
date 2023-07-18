import { NextRequest, NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import {
  queryPineconeVectorStoreAndQueryLLM,
} from '../../../utils'
import { indexName } from '../../../config'


export const config = {
  runtime: "edge",
};

export default async function handler(req){
  
  const body = await req.json()
  // body should be string but I get an Stream
  console.log(body.message, 'Body')
  const client = new PineconeClient()
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  })

  const text = await queryPineconeVectorStoreAndQueryLLM(client, indexName, body.message)

  // let response = NextResponse.json({
  //   data: text
  // })

  // let output = await response.json()
  // console.log(output.data)
 
  // return output.data 
  console.log(text, 'Text')

  return new NextResponse(JSON.stringify({ data: text }), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  });
}