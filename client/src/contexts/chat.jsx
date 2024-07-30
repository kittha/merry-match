import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuth } from "./authentication";
import { createMessage, getPrevMessages } from "../hooks/connectMsg.mjs";

const ChatContext = React.createContext();

const useChat = () => React.useContext(ChatContext);

function ChatProvider(props) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(null);
  const { state } = useAuth();
  console.log(state);

  const userId = state.user?.id;
  //---------------------------------------------------------------------
  // add online users
  //this section should be call before click each chat
  useEffect(() => {
    // connect socket
    socket.current = io(import.meta.env.VITE_BACKEND_URL);

    if (userId) {
      socket.current.emit("add-user", userId);
      // socket.on("get-user", (res) => {
      //   setOnlineUsers(res);
      // });
    }
  }, [userId]);
  //---------------------------------------------------------------------
  // matchId will input when use this component and should instead of 84
  const fetchData = async () => {
    const data = await getPrevMessages(84);
    setMessages(data);
  };

  useEffect(() => {
    // get chat history from database
    fetchData();

    // listen message from socket
    socket.current.on("receive-msg", (msg) => {
      console.log("receive", msg);
      setArrivalMessage(msg);
    });

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []); //[currentChat]

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    console.log("arrivalEffect");
  }, [arrivalMessage]);

  const handleSendMsg = async (event, inputText) => {
    event.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }

    const sendData = {
      sender: userId,
      matchId: 84,
      message: inputText,
      dateTime: new Date(),
    };

    socket.current.emit("send-msg", sendData);

    await createMessage(84, sendData);

    const newMessages = [...messages];
    newMessages.push(sendData);
    setMessages(newMessages);
  };

  return (
    <ChatContext.Provider value={{ messages, handleSendMsg }}>
      {props.children}
    </ChatContext.Provider>
  );
}

export { ChatProvider, useChat };
