import { ChatSidebar } from "components/ChatSidebar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { streamReader } from "openai-edge-stream";
import { v4 as uuid } from "uuid";
import { Message } from "components/Message";
import { useRouter } from "next/router";
import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUserTie } from "@fortawesome/free-solid-svg-icons";
import StandardMessageForm from "components/CustomMessageForms/StandardMessageForm";
import { useUpload } from "../../components/CustomMessageForms/useUpload";
export default function ChatPage({ chatId, title, messages = [] }) {
  const [incomingMessage, setIncomingMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [newChatMessages, setNewChatMessages] = useState([]);
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const [newChatId, setNewChatId] = useState(null);
  const [fullMessage, setFullMessage] = useState("");
  const [originalChatId, setOriginalChatId] = useState(chatId);
  const [image, setImage] = useState(' ')

  const router = useRouter();

  const routeHasChanged = chatId !== originalChatId;



  const {isLoading, uploadFile, filename} = useUpload()


 

  
  // When our route changes, we want to reset the new chat messages
  useEffect(() => {
    setNewChatMessages([]);
    setNewChatId(null);
  }, [chatId]);

  useEffect(() => {
    setImage(filename)
  }, [filename])

  // Save the newly streamed message to new chat messages
  useEffect(() => {
    if (!routeHasChanged && !generatingResponse && fullMessage) {
      setNewChatMessages((prev) => [
        ...prev,
        {
          _id: uuid(),
          role: "assistant",
          content: fullMessage,
        },
      ]);
      setFullMessage("");
    }
  }, [generatingResponse, fullMessage, routeHasChanged]);

  // When we get a new chat id, we want to redirect to that chat
  useEffect(() => {
    if (!generatingResponse && newChatId) {
      setNewChatId(null);
      router.push(`/chat/${newChatId}`);
    }
  }, [newChatId, generatingResponse, router]);

  const handleSubmit = async (e) => {
    

    setGeneratingResponse(true);
    setOriginalChatId(chatId);

    setNewChatMessages((prev) => {
      const newChatMessages = [
        ...prev,
        {
          _id: uuid(),
          role: "user",
          content: image != ' '? image: messageText,
        },
      ];
      return newChatMessages;
    });

    setMessageText("");
    setImage(" ")

    // проверка на url or not 
    // only for urls
    let response
    if(image != " "){
      console.log(image, chatId, 'params from chatId page')
      // for image
      response = await fetch(`/api/chat/azureMessage`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          chatid: chatId,
          imageurl: image
        }),
  
      })
      console.log(response, "response from azure")
    }
    else{
      console.log('text generating');
      // for text
      
      response = await fetch(`/api/chat/sendMessage`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          message: messageText
        }),
      });

      console.log(response.body, 'RESPONSE FROM TEXT')
    }

   

    const data = response.body;
    console.log(data, 'DATA')
    if (!data) return;    // try {
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

    
    
    const reader = data.getReader();
    console.log(reader, 'reader')
    let content = "";
    await streamReader(reader, (message) => {
      console.log('stream reader starting...')
      if (message.event === "newChatId") {
        console.log('newchatId')
        setNewChatId(message.content);
      } else {
        setIncomingMessage((s) => `${s}${message.content}`);
        content = content + message.content;
      }
      });

    setFullMessage(content);
    setIncomingMessage("");
    setGeneratingResponse(false);
  };

  const handleChange = (e) => setMessageText(e.target.value) //set message text in the chat
  //const handleImageChange = (text) => setMessageText(text)
  const allMessages = [...messages, ...newChatMessages];

  return (
    <>
      <Head>
        <title>Новый чат</title>
      </Head>

      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar chatId={chatId} />
        <div className="flex flex-col bg-primary overflow-hidden pt-10">
          <div className="flex-1 flex flex-col-reverse text-white overflow-y-scroll">
            {!allMessages.length && !incomingMessage && (
              <div className="m-auto justify-center flex items-center text-center">
                <div>
                  {" "}
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="text-6xl text-btn-color"
                  />
                  <h1 className="text-4xl font-bold text-white/50 mt-2">
                    Твой персональный инспектор ГИБДД
                  </h1>
                </div>
              </div>
            )}
            {!!allMessages.length && (
              <div className="mb-auto">
                {allMessages.map((message) => (
                  <Message
                    key={message._id}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {!!incomingMessage && !routeHasChanged && (
                  <Message role="assistant" content={incomingMessage} />
                )}
                {!!incomingMessage && routeHasChanged && (
                  <Message
                    role="notice"
                    content="Only one message at a time. Please allow any other responses to complete before sending another message"
                  />
                )}
              </div>
            )}
          </div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2" disabled={generatingResponse}>
                {/* <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={generatingResponse ? "" : "Отправь сообщение..."}
                  className="w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-chat-btn"
                  name=""
                  id=""
                ></textarea>
                <button type="submit" className="btn bg-btn-color hover:bg-primary">
                  Отправить
                </button> */}
                <StandardMessageForm uploadFile={uploadFile} filename={filename} chatId={chatId} value={messageText} handleSubmit={handleSubmit} onChange={handleChange}   />
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const chatId = ctx.params?.chatId?.[0] || null;
  if (chatId) {
    let objectId;

    try {
      objectId = new ObjectId(chatId);
    } catch (error) {
      return {
        redirect: {
          destination: "/chat",
        },
      };
    }
    const { user } = await getSession(ctx.req, ctx.res);
  
    const client = await clientPromise;
    const db = client.db("ChattyPete");
    const chat = await db
      .collection("chats")
      .findOne({ userId: user.sub, _id: objectId });

    if (!chat) {
      return {
        redirect: {
          destination: "/chat",
        },
      };
    }

    return {
      props: {
        chatId,
        title: chat.title,
        messages: chat.messages.map((message) => ({
          ...message,
          _id: uuid(),
        })),
      },
    };
  }
  return {
    props: {},
  };
};
