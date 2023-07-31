import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPlus,
  faRightFromBracket,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import {GiPoliceOfficerHead} from 'react-icons/gi'
import Image from "next/image";
import Kaz from '../../public/kaz.png'
import Logo from '../../public/patrol.png'
export const ChatSidebar = ({ chatId }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadChatList = async () => {
      const response = await fetch(`/api/chat/getChatList`, {
        method: "POST",
      });

      const json = await response.json();
      
      setChatList(json?.chats || []);
    };

    loadChatList();
  }, [chatId]);

  return (
    <aside className="bg-primary sm:text-sm text-black flex flex-col overflow-hidden transition-all duration-150 ease-in">
      <div className="flex items-center ml-2 justify-between">
        {/* <Link href="/" className="m-auto p-3">
          <Image width={200} height={30} alt="logo" src={Logo}/>
        </Link> */}
        
        
      </div>
      <Link
        href="/chat"
        className="side-menu-item bg-logo text-white"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span className="font-bold">Новый чат</span>
      </Link>
      <div className="flex-1 overflow-auto bg-gray-200">
        {chatList.map((chat) => (
          <Link
            key={chat._id}
            href={`/chat/${chat._id}`}
            className={`side-menu-item ${
              chatId === chat._id ? "bg-gray-200 hover:bg-logo" : ""
            }`}
          >
            <FontAwesomeIcon icon={faMessage} className="text-gray-600" />
            <span
              title={chat.title}
              className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      <Link href="/" className="side-menu-item">
        <FontAwesomeIcon icon={faHome} />
        На главную 
      </Link>
      <Link href="/api/auth/logout" className="side-menu-item">
        <FontAwesomeIcon icon={faRightFromBracket} />
        Выйти
      </Link>
    </aside>
  );
};
