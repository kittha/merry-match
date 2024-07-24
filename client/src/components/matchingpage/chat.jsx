import { useState } from "react";
import { io } from "socket.io-client";
import matched from "/assets/matchingpage/merry-match-icon.png";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";
import back from "/assets/matchingpage/left-arrow.png";

const Chat = () => {
  const arrSend = [
    "Hello",
    "World",
    "Do you like ma dragons?",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  ];
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
        {/* other user bubble */}
        <div className="display-message w-full flex flex-col gap-2 lg:gap-4">
          {arrSend.map((msg) => {
            return (
              <div className="message-line flex flex-row items-end gap-3">
                <img
                  src="#"
                  alt="profile-image"
                  className="profile-pic bg-slate-400 w-10 h-10 rounded-full"
                />
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit rounded-3xl rounded-bl-none bg-[#EFC4E2] py-3 lg:py-4 px-6">
                  {msg}
                </div>
              </div>
            );
          })}
        </div>
        {/* owner bubble */}
        <div className="display-message w-full flex flex-col gap-2 lg:gap-4">
          {arrSend.map((msg) => {
            return (
              <div className="message-line flex flex-row-reverse items-end gap-3">
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit rounded-3xl rounded-br-none bg-[#7D2262] py-3 lg:py-4 px-6 text-white">
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
