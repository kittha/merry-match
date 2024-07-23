import { useState } from "react";
import { io } from "socket.io-client";
import matched from "/assets/matchingpage/merry-match-icon.png";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";

const Chat = () => {
  const arrSend = ["Hello", "World", "Do you like ma dragons?"];
  // const socket = io();
  const [inputText, setInputText] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleTyping = (event) => {
    setInputText(event.target.value);
  };

  // console.log(inputText);

  //   useEffect(async () => {
  //     const response = await axios.post(recieveMessageRoute, {
  //       from: data._id,
  //       to: currentChat._id,
  //     });
  //     setMessages(response.data);
  //   }, [currentChat]);

  //   useEffect(() => {
  //     const getCurrentChat = async () => {
  //       if (currentChat) {
  //         await JSON.parse(
  //           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //         )._id;
  //       }
  //     };
  //     getCurrentChat();
  //   }, [currentChat]);

  const handleSendMsg = async (event) => {
    event.preventDefault();

    // socket.current.emit("send-msg", {
    //   to: currentChat._id,
    //   from: data._id,
    //   msg,
    // });

    // await axios.post(path, {
    //   from: data._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    // const msgs = [...messages];
    // msgs.push({ fromSelf: true, message: msg });
    // setMessages(msgs);
  };

  //   useEffect(() => {
  //     if (socket.current) {
  //       socket.current.on("msg-recieve", (msg) => {
  //         setArrivalMessage({ fromSelf: false, message: msg });
  //       });
  //     }
  //   }, []);

  //   useEffect(() => {
  //     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  //   }, [arrivalMessage]);

  return (
    <div className="chat-area bg-[#160404] h-screen w-full pt-[88px] flex flex-col gap-10 justify-end">
      <main className="h-fit w-full px-[60px] flex flex-col gap-12 justify-end items-center">
        <div className="headbox w-[749px] h-[90px] bg-[#F4EBF2] border border-[#DF89C6] rounded-2xl flex flex-row gap-6 justify-center items-center">
          <img
            src={matched}
            alt="merry-match-icon"
            className="w-[60px] h-[35px]"
          />
          <p className="text-[#64001D] font-Nunito font-medium">
            Now you and {"Daneal"} are Merry Match!
            <br />
            You can messege something nice and make a good conversation. Happy
            Merry!
          </p>
        </div>
        <div className="display-message w-full border flex flex-col gap-4">
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
        </div>
        <div className="display-message w-full border flex flex-col gap-4">
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
      </main>
      <form
        onSubmit={(event) => {
          handleSendMsg(event);
        }}
        className="input-message border border-pink-400 h-[100px] px-[60px] py-[26px] flex flex-row gap-6"
      >
        <img
          src={upload}
          alt="insert-icon"
          className="insert-image bg-white rounded-full w-12 h-12 object-none"
        />
        <input
          type="text"
          placeholder="Message here..."
          className="input-msg flex-1 placeholder:text-[#9B9EAD] bg-transparent"
          value={inputText}
          onChange={(event) => {
            handleTyping(event);
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
