import { useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const arrSend = ["Hello", "World", "Do you like ma dragons?"];
  const socket = io();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleTyping = (event) => {
    setInputText(event.target.value);
  };

  console.log(inputText);

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
    <div className="chat-area bg-[#160404] h-[924px] pt-[88px] flex flex-col justify-end">
      <div className="display-message border flex flex-col gap-4 mx-[60px] my-10">
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
      <form
        onSubmit={(event) => {
          handleSendMsg(event);
        }}
        className="input-message border border-pink-400 h-[100px] px-[60px] py-[26px] flex flex-row gap-6"
      >
        <img
          src="#"
          alt="insert-icon"
          className="insert-image bg-white rounded-full w-12 h-12"
        />
        <input
          type="text"
          placeholder="Message here..."
          className="input-msg flex-1"
          value={inputText}
          onChange={(event) => {
            handleTyping(event);
          }}
        />
        <button type="submit">
          <img
            src="#"
            alt="send-icon"
            className="send bg-[#C70039] rounded-full w-12 h-12"
          />
        </button>
      </form>
    </div>
  );
};

export default Chat;
