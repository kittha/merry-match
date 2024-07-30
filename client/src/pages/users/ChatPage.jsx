import { useState, useEffect, useRef } from "react";
import InputSection from "../../components/matchingpage/chat-area/Input";
import DisplayChat from "../../components/matchingpage/chat-area/Display";
import BackBar from "../../components/matchingpage/chat-area/BackBar";

const Chat = () => {
  return (
    <div className="chat-container bg-[#160404] relative h-screen w-full pt-[52px] lg:pt-[88px] flex flex-col">
      <BackBar />
      <DisplayChat />
      <InputSection />
    </div>
  );
};

export default Chat;
