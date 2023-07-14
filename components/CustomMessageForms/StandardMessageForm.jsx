import React, { useState } from "react";
import MessageFormUI from "./MessageFormUi";
import { useUpload } from "./useUpload";

const StandardMessageForm = ({ props, filename, uploadFile, chatId, value, onChange, handleSubmit }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");



  
//   const handleSubmit = async () => {
//     const date = new Date()
//       .toISOString()
//       .replace("T", " ")
//       .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
//     const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
//     const form = {
//       attachments: at,
//       created: date,
//       sender_username: props.username,
//       text: message,
//       activeChatId: chatId,
//     };

//     props.onSubmit(form);
//     setMessage("");
//     setAttachment("");
//   };

  return (
    <MessageFormUI
      value={value}
      setAttachment={setAttachment}
      message={message}
      filename={filename}
      handleChange={onChange}
      handleSubmit={handleSubmit}
      uploadFile={uploadFile}
    />
  );
};

export default StandardMessageForm;