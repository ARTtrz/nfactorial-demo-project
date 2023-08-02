// import { useUser } from "@auth0/nextjs-auth0/client";
// import { faRobot, faUserTie } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
// import {GiPoliceOfficerHead} from 'react-icons/gi'
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// export const Message = ({ role, content }) => {
//   const { user } = useUser();

//   return (
//     <div
//       className={`grid grid-cols-[35px_1fr] gap-5 p-5 m-5 rounded-xl border-2 border-border  ${
//         role === "assistant"
//           ? "bg-chat border-0"
//           : role === "notice"
//           ? "bg-red-600"
//           : ""
//       }`}
//     >
//       <div>
//         {role === "user" && !!user && (
//           <Image
//             src={user.picture}
//             width={30}
//             height={30}
//             alt="User avatar"
//             className="rounded-sm shadow-md shadow-black/50"
//           />
//         )}
//         {role === "assistant" && (
//           <div className="flex items-center justify-center w-[30px] h-[30px] rounded-sm shadow-md shadow-black/50 bg-gray-800">
//             <FontAwesomeIcon icon={faUserTie} className="text-emerald-200" />
//           </div>
//         )}
//       </div>
//       <div className="w-auto">
//         <div>{content}</div>
//       </div>
//     </div>
//   );
// };

import { useUser } from "@auth0/nextjs-auth0/client";
import { faRobot, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PatrolIcon from '../../public/chase1.png'

export const Message = ({ role, content }) => {
  const { user } = useUser();

  const isImageLink = (url) => {
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase();
    return imageExtensions.includes(extension);
  };

  const renderContent = () => {
    if (isImageLink(content)) {
      return (
        <Image
          src={content}
          width={300} // adjust the width and height as needed
          height={200}
          alt="Image"
          className="rounded-sm shadow-md shadow-black/50"
        />
      );
    } else {
      return <div className="prose lg:prose-lg text-black  sm:text-sm sm:w-auto prose-invert max-w-max">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>;
    }
  };

  return (
    <div
      className={`grid grid-cols-[35px_1fr] gap-5 p-5 m-5 rounded-xl border-2 border-border  ${
        role === "assistant" ? "bg-primary text-black border-0" : role === "notice" ? "bg-red-600" : "bg-white"
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
          <div className="flex items-center justify-center bg-white w-[35px] h-[35px] rounded-sm shadow-md shadow-black/50 bg-transparent">
            <Image src={PatrolIcon} width={50} height={20} alt="chase"/>
          </div>
        )}
      </div>
      <div className="w-auto">{renderContent()}</div>
    </div>
  );
};
