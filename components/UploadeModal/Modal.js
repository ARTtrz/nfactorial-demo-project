import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
  } from "@heroicons/react/24/solid";
import Image from "next/image";
  import React, { useEffect, useState } from "react";
  import Dropzone from "react-dropzone";
function Modal({isOpen, setOpen, uploadFile, open, filename, handleSubmit}){
    const [preview, setPreview] = useState(" ")
        useEffect(() => {
        setPreview(`${filename}`);
      }, [filename])
      function closeModal() {
        setOpen(false)
      }
    
      function openModal() {
        setOpen(true)
      }
    
      return (
        <>
          {/* <div className="fixed inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Open dialog
            </button>
          </div> */}
    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Загрузка фото
                      </Dialog.Title>
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
                        
                        }}
                        />
                     </div>
                     ): <></>}
                        
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 my-5">
                            Загрузите фотографию любого дорожного знака и я расскажу о нем АБСОЛЮТНО все. Подаждите пока фото загрузится
                        </p>
                        <input  onChange={uploadFile} type="file" className="py-4 focus: no-underline"/>
                      </div>
    
                      <div className="mt-4">
                        <button
                          type="button"
                          disabled={filename == ' '}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            handleSubmit()
                            closeModal()
                            setPreview(" ");
                          }}
                        >
                          Отправить
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
}
export default Modal