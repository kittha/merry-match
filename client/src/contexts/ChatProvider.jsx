import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authentication";
import { getLastMessagesByUserId } from "../hooks/connectMsg.mjs";

const ChatContext = React.createContext();

// this is a hook that consume MatchContext
const useChat = () => React.useContext(ChatContext);

function ChatProvider(props) {
  const [lastMsg, setLastMsg] = useState([]);
  const { state } = useAuth();
  const userId = state.user?.id;

  const fetchData = async () => {
    const data = await getLastMessagesByUserId(userId);
    data.sort((a, b) => {
      a.dateTime = new Date(a.dateTime);
      b.dateTime = new Date(b.dateTime);
      // console.log("a", a, "b", b);
      return b.dateTime - a.dateTime;
    });
    setLastMsg(data);
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <ChatContext.Provider
      value={{
        lastMsg,
        setLastMsg,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
}

export { ChatProvider, useChat };
