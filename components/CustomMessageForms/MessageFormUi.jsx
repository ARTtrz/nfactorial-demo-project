import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
  } from "@heroicons/react/24/solid";
import Image from "next/image";
  import React, { useEffect, useState } from "react";
  import Dropzone from "react-dropzone";
import Modal from "../UploadeModal/Modal";
  
  const MessageFormUI = ({
    setAttachment,
    message,
    handleChange,
    handleSubmit,
    appendText,
    handleKeyDown,
    filename,
    value,
    uploadFile
  }) => {
    const [preview, setPreview] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    // console.log(filename, 'for message')
    
    // useEffect(() => {
    //   setPreview(`${filename}`);
    // }, [filename])
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent new line from being added in a textarea (if using textarea)
        handleSubmit()
      }
    };
    return (
      
      <div className="message-form-container">
        {/* <Image
              width={40}
              height={40}
              alt="message-form-preview"
              className="message-form-preview-image"
              src={filename}
              onLoad={() => URL.revokeObjectURL(preview)}
        /> */}
        
        {/* {preview != ' '  ? (
          <div className="message-form-preview">
            <Image
              width={40}
              height={40}
              alt="message-form-preview"
              className="message-form-preview-image"
              src={preview}
              onLoad={() => URL.revokeObjectURL(preview)}
            />
            <XMarkIcon
              className="message-form-icon-x"
              onClick={() => {
                setPreview(" ");
                setAttachment("");
              }}
            />
          </div>
        ): <></>} */}

        <div className="message-form">
          <div className="message-form-input-container">
            
            <input
              className="message-form-input"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Отправь сообщение..."
            />
            {appendText && (
              <input
                value={value}
                className="message-form-assist"
                type="text"
                onKeyDown={handleKeyPress}
                
                // value={`${message} ${appendText}`}
              />
            )}
          </div>
          <div className="message-form-icons">

            <PaperClipIcon
                className="message-form-icon-clip"
                onClick={() => setIsOpen(!isOpen)}
                  
            />
            <Modal uploadFile={uploadFile} handleSubmit={handleSubmit} filename={filename} isOpen={isOpen} setOpen={setIsOpen}/>
  
            <hr className="vertical-line" />
            <PaperAirplaneIcon
              className="message-form-icon-airplane"
              onClick={() => {
                setPreview(" ");
                handleSubmit();
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default MessageFormUI;