import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import {GiPoliceOfficerHead} from 'react-icons/gi'
import Image from "next/image";
import Kaz from '../../public/kaz.png'
export const ChatSidebar = ({ chatId }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadChatList = async () => {
      const response = await fetch(`/api/chat/getChatList`, {
        method: "POST",
      });

      const json = await response.json();
      console.log("chat list: ", json);
      setChatList(json?.chats || []);
    };

    loadChatList();
  }, [chatId]);

  return (
    <aside className="bg-primary text-white flex flex-col overflow-hidden transition-all duration-150 ease-in">
      <div className="flex items-center ml-2 justify-between">
        <GiPoliceOfficerHead className="text-3xl" />
        <h1 className="ml-2 my-3 text-2xl">Inspector AI</h1>
        <Image src={Kaz} width={60} height={60} alt="kaz"/>
      </div>
      <Link
        href="/chat"
        className="side-menu-item bg-btn-color"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span className="font-bold">Новый чат</span>
      </Link>
      <div className="flex-1 overflow-auto bg-gray-950">
        {chatList.map((chat) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}
            className={`side-menu-item ${
              chatId === chat._id ? "bg-gray-700 hover:bg-gray-700" : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessage} className="text-white/50" />
            <span
              title={chat.title}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      <Link href="/api/auth/logout" className="side-menu-item">
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </Link>
    </aside>
  );
};
