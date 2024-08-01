import { useState, useEffect, useRef } from "react";
import InputSection from "../../components/matchingpage/chat-area/Input";
import DisplayChat from "../../components/matchingpage/chat-area/Display";
import BackBar from "../../components/matchingpage/chat-area/BackBar";
import { useAuth } from "../../contexts/authentication";
import {
  createMessage,
  getPrevMessages,
  getMatchInfo,
} from "../../hooks/connectMsg.mjs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";

const Chat = () => {
  const { state } = useAuth();
  console.log(state);

  const userId = state.user?.id;

  let { matchId } = useParams();
  matchId = Number(matchId);
  console.log("matchId: ", matchId);

  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const fetchData = async () => {
    const response = await getMatchInfo(matchId);
    const data = await getPrevMessages(matchId);

    console.log("response", response);
    if (userId === response.user_id_1) {
      setReceiver(response.user_id_2);
    } else {
      setReceiver(response.user_id_1);
    }
    setMessages(data);
  };

  //---------------------------------------------------------------------
  //this section should be call before click each chat
  useEffect(() => {
    if (userId) {
      // get chat history and match info from database
      fetchData();

      // connect socket
      socket.current = io(import.meta.env.VITE_BACKEND_URL);
      console.log("Connected to WebSocket server");

      // add online user
      socket.current.emit("add-user", userId);
      // socket.on("get-user", (res) => {
      //   setOnlineUsers(res);
      // });
    }
  }, [userId, matchId]);
  //---------------------------------------------------------------------

  useEffect(() => {
    // listen message from socket
    if (socket.current) {
      socket.current.on("receive-msg", (msg) => {
        console.log("*****receive*******", msg);
        setArrivalMessage(msg);
      });
    }
  }, [socket.current]);

  const handleSendMsg = async (inputText, inputFile) => {
    if (inputText.trim().length === 0 && !inputFile) {
      return;
    }
    const sendData = {
      sender: userId,
      receiver,
      matchId,
      message: inputText ? inputText : null,
      file: inputFile,
      dateTime: new Date(),
    };
    console.log("sendData: ", sendData);

    const response = await createMessage(sendData);

    if (!inputText) {
      socket.current.emit("send-msg", sendData);
      const newMessages = [...messages];
      newMessages.push(sendData);
      setMessages(newMessages);
    }
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
        {messages && <DisplayChat messages={messages} userId={userId} />}
        {messages && <InputSection handleSendMsg={handleSendMsg} />}
      </div>
    </div>
  );
};

export default Chat;
