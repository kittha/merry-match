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

  const sender = state.user?.id;

  let { matchId } = useParams();
  matchId = Number(matchId);
  console.log("matchId: ", matchId);

  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(null);

  //---------------------------------------------------------------------
  // add online users
  //this section should be call before click each chat
  useEffect(() => {
    if (sender) {
      // connect socket
      socket.current = io(import.meta.env.VITE_BACKEND_URL);
      console.log("Connected to WebSocket server");

      socket.current.emit("add-user", sender);
      // socket.on("get-user", (res) => {
      //   setOnlineUsers(res);
      // });
    }
  }, [sender]);
  //---------------------------------------------------------------------
  const fetchData = async () => {
    const { user_id_1, user_id_2 } = await getMatchInfo(matchId);
    console.log({ user_id_1, user_id_2 });
    if (sender === user_id_1) {
      setReceiver(user_id_2);
    } else {
      setReceiver(user_id_1);
    }
    const data = await getPrevMessages(matchId);
    setMessages(data);
  };

  useEffect(() => {
    // get chat history and match info from database
    if (matchId) {
      fetchData();
    }
  }, [matchId]); //[currentChat]

  useEffect(() => {
    // listen message from socket
    if (socket.current) {
      console.log("i'm in");
      socket.current.on("receive-msg", (msg) => {
        console.log("*****receive*******", msg);
        setArrivalMessage(msg);
      });
    }
  }, [socket.current]);

  const handleSendMsg = async (event, inputText) => {
    event.preventDefault();
    if (inputText.trim().length === 0) {
      return;
    }
    const sendData = {
      sender,
      receiver,
      matchId,
      message: inputText,
      dateTime: new Date(),
    };
    console.log("sendData: ", sendData);
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
        {messages?.length && (
          <DisplayChat messages={messages} userId={sender} />
        )}
        {messages?.length && <InputSection handleSendMsg={handleSendMsg} />}
      </div>
    </div>
  );
};

export default Chat;
