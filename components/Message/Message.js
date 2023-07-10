import { useUser } from "@auth0/nextjs-auth0/client";
import { faRobot, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {GiPoliceOfficerHead} from 'react-icons/gi'
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const Message = ({ role, content }) => {
  const { user } = useUser();

  return (
    <div
      className={`grid grid-cols-[35px_1fr] gap-5 p-5 m-5 rounded-xl border-2 border-border  ${
        role === "assistant"
          ? "bg-chat border-0"
          : role === "notice"
          ? "bg-red-600"
          : ""
      }`}
    >
      <div>
        {role === "user" && !!user && (
          <Image
            src={user.picture}
            width={30}
            height={30}
            alt="User avatar"
            className="rounded-sm shadow-md shadow-black/50"
          />
        )}
        {role === "assistant" && (
          <div className="flex items-center justify-center w-[30px] h-[30px] rounded-sm shadow-md shadow-black/50 bg-gray-800">
            <FontAwesomeIcon icon={faUserTie} className="text-emerald-200" />
          </div>
        )}
      </div>
      <div className="w-auto">
        <div>{content}</div>
      </div>
    </div>
  );
};
