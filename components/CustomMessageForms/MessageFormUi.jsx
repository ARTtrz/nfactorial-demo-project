import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
  } from "@heroicons/react/24/solid";
import Image from "next/image";
  import React, { useEffect, useState } from "react";
  import Dropzone from "react-dropzone";
  
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
    // console.log(filename, 'for message')
    
    useEffect(() => {
      setPreview(`${filename}`);
    }, [filename])
    
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
        {preview != ' '  ? (
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
        ): <></>}
        <div className="message-form">
          <div className="message-form-input-container">
            
            <input
              className="message-form-input"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Отправь сообщение..."
            />
            {appendText && (
              <input
                value={value}
                className="message-form-assist"
                type="text"
                
                // value={`${message} ${appendText}`}
              />
            )}
          </div>
          <div className="message-form-icons">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              noClick={true}
              
              onDrop={(acceptedFiles) => {
                setAttachment(acceptedFiles[0]);
                setPreview(filename);
              }}
            >
              {({ getRootProps, getInputProps, open }) => (
                <div {...getRootProps()} >
                  <input {...getInputProps()} onChange={uploadFile} />
                  <PaperClipIcon
                    className="message-form-icon-clip"
                    onClick={open}

                  />
                </div>
              )}
            </Dropzone>
  
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