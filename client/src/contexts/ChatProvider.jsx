import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getLastMessagesByUserId } from "../hooks/connectMsg.mjs";
import {getUserIdFromStoredData} from "../utils/sessionManager";

export const ChatContext = React.createContext();

function ChatProvider(props) {
  const [lastMsg, setLastMsg] = useState([]);
  const { state } = useAuth();
  const userData = state.user?.data
  const userId = userData?.id || getUserIdFromStoredData();

  const fetchData = async () => {
    const data = await getLastMessagesByUserId(userId);
    console.log("at ChatProvider.jsx line 16 : data is ", data);
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

export { ChatProvider };
