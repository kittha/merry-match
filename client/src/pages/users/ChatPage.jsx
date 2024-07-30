import { useState, useEffect, useRef } from "react";
import InputSection from "../../components/matchingpage/chat-area/Input";
import DisplayChat from "../../components/matchingpage/chat-area/Display";
import BackBar from "../../components/matchingpage/chat-area/BackBar";
import { useAuth } from "../../contexts/authentication";
import { createMessage, getPrevMessages } from "../../hooks/connectMsg.mjs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";

const Chat = () => {
  const { matchId } = useParams();
  console.log(matchId);
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
    console.log("Connected to WebSocket server");

    if (userId) {
      socket.current.emit("add-user", userId);
      // socket.on("get-user", (res) => {
      //   setOnlineUsers(res);
      // });
    }
  }, [userId]);
  //---------------------------------------------------------------------
  const fetchData = async () => {
    const data = await getPrevMessages(Number(matchId));
    setMessages(data);
  };

  useEffect(() => {
    // get chat history from database
    fetchData();

    // listen message from socket
    console.log("i'm in");
    socket.current.on("receive-msg", (msg) => {
      console.log("*****receive*******", msg);
      setArrivalMessage(msg);
    });
  }, [matchId]); //[currentChat]

  const handleSendMsg = async (event, inputText) => {
    event.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }
    const sendData = {
      sender: userId,
      matchId: Number(matchId),
      message: inputText,
      dateTime: new Date(),
    };

    socket.current.emit("send-msg", sendData);

    await createMessage(matchId, sendData);

    const newMessages = [...messages];
    newMessages.push(sendData);
    setMessages(newMessages);
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    console.log("arrivalEffect");
  }, [arrivalMessage]);

  return (
    <div className="page flex flex-row">
      <div className="sidebar hidden lg:flex">
        <ChatContainer />
      </div>
      <div className="chat-container bg-[#160404] relative h-screen w-full pt-[52px] lg:pt-[88px] flex flex-col">
        <BackBar />
        <DisplayChat messages={messages} />
        <InputSection handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
};

export default Chat;
