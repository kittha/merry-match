import { useState } from "react";

const Chat = () => {
  const arrSend = ["Hello", "World", "Do you like ma dragons?"];
  return (
    <div className="chat-area bg-[#160404] h-[924px] pt-[88px] flex flex-col justify-end">
      <div className="display-message border flex flex-col gap-4 mx-[60px] my-10">
        {arrSend.map((msg) => {
          return (
            <div className="message-line flex flex-row items-end gap-3">
              <img
                src="#"
                alt="profile-image"
                className="profile-pic bg-slate-400 w-10 h-10 rounded-full"
              />
              <div className="message-box w-fit h-fit rounded-3xl rounded-bl-none bg-[#EFC4E2] px-6 py-4">
                {msg}
              </div>
            </div>
          );
        })}
        {arrSend.map((msg) => {
          return (
            <div className="message-line flex flex-row-reverse items-end gap-3">
              <div className="message-box w-fit h-fit rounded-3xl rounded-br-none bg-[#7D2262] text-white px-6 py-4">
                {msg}
              </div>
            </div>
          );
        })}
      </div>
      <footer className="input-message border border-pink-400 h-[100px] px-[60px] py-[26px] flex flex-row gap-6">
        <img
          src="#"
          alt="insert-icon"
          className="insert-image bg-white rounded-full w-12 h-12"
        />
        <input
          type="text"
          placeholder="Message here..."
          className="input-msg flex-1"
        ></input>
        <img
          src="#"
          alt="send-icon"
          className="send bg-[#C70039] rounded-full w-12 h-12"
        />
      </footer>
    </div>
  );
};

export default Chat;
