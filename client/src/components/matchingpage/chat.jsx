import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import matched from "/assets/matchingpage/merry-match-icon.png";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";
import back from "/assets/matchingpage/left-arrow.png";
import { useAuth } from "../../contexts/authentication";
import { createMessage, getPrevMessages } from "../../hooks/connectMsg.mjs";

const Chat = (matchId) => {
  // matchId will input when use this component and should instead of 84
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { state } = useAuth();
  console.log(state);

  const userId = state.user?.id;
  const socket = useRef(null);

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
      setArrivalMessage(msg); //{ fromSelf: false, message: msg }
    });

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []); //[currentChat]

  const handleSendMsg = async (event) => {
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

    setInputText("");
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <div className="chat-area bg-[#160404] h-fit w-full pt-[52px] lg:pt-[88px] flex flex-col lg:justify-end">
      <div className="back-bar lg:hidden h-12 bg-white py-3 px-2 flex flex-row gap-4">
        <img src={back} alt="arrow-left" className="h-6 w-6" onClick={""} />
        <p className="font-medium text-[#2A2E3F] font-Nunito">{"Daeny"}</p>
      </div>
      <main className="h-full w-full py-6 lg:py-10 px-4 lg:px-[60px] flex flex-col gap-7 lg:gap-12 lg:justify-end items-center overflow-y-auto">
        <div className="headbox max-w-[749px] w-fit lg:h-[90px] bg-[#F4EBF2] border border-[#DF89C6] rounded-2xl py-3 px-4 lg:py-6 lg:px-0 flex flex-row gap-4 lg:gap-6 justify-center items-center">
          <img
            src={matched}
            alt="merry-match-icon"
            className="ml-0 lg:ml-20 w-10 h-6 lg:w-[60px] lg:h-[35px]"
          />
          <p className="mr-0 lg:mr-20 text-[#64001D] text-xs leading-[18px] lg:text-sm font-Nunito font-medium">
            Now you and {"Daeny"} are Merry Match!
            <br />
            You can messege something nice and make a good conversation. Happy
            Merry!
          </p>
        </div>

        <div className="display-message w-full flex flex-col gap-2 lg:gap-4">
          {messages.map((msg, index) => {
            return msg.sender === userId ? (
              // owner bubble
              <div
                key={index}
                className="message-line flex flex-row-reverse items-end gap-3"
              >
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit rounded-3xl rounded-br-none bg-[#7D2262] py-3 lg:py-4 px-6 text-white">
                  {msg.message}
                </div>
              </div>
            ) : (
              // other user bubble
              <div className="message-line flex flex-row items-end gap-3">
                <img
                  src="#"
                  alt="profile-image"
                  className="profile-pic bg-slate-400 w-10 h-10 rounded-full"
                />
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit rounded-3xl rounded-bl-none bg-[#EFC4E2] py-3 lg:py-4 px-6">
                  {msg.message}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <form
        onSubmit={(event) => {
          handleSendMsg(event);
        }}
        className="input-message border-t border-[#424C6B] h-[72px] lg:h-[100px] py-3 px-4 lg:py-[26px] lg:px-[60px] flex flex-row gap-4 lg:gap-6"
      >
        <img
          src={upload}
          alt="insert-icon"
          className="insert-image bg-white rounded-full w-12 h-12 object-none"
        />
        <input
          type="text"
          placeholder="Message here..."
          className="input-msg flex-1 placeholder:text-[#9B9EAD] text-[#9B9EAD] bg-transparent focus:outline-none"
          value={inputText}
          onChange={(event) => {
            setInputText(event.target.value);
          }}
        />
        <button type="submit">
          <img
            src={send}
            alt="send-icon"
            className="send bg-[#C70039] rounded-full w-12 h-12 object-none"
          />
        </button>
      </form>
    </div>
  );
};

export default Chat;
