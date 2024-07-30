import { useEffect } from "react";
import { useAuth } from "../../../contexts/authentication";
import { useChat } from "../../../contexts/chat";
import matched from "/assets/matchingpage/merry-match-icon.png";

const DisplayChat = () => {
  const { state } = useAuth();
  console.log(state);

  const userId = state.user?.id;

  const { messages } = useChat();

  const scrollToBottom = () => {
    const element = document.getElementsByTagName("main")[0];
    const hight = element.scrollHeight;
    // console.log("element", element, "hight", hight);
    element.scrollTo({ top: hight });
  };

  useEffect(() => {
    scrollToBottom();
    console.log("scrollEffect");
  }, [messages]);

  return (
    <main className="display-section box-border h-fit w-full py-6 lg:py-10 px-4 lg:px-[60px] flex-1 flex flex-col gap-7 lg:gap-12 justify-between items-center overflow-y-auto">
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

      <div className="message w-full flex flex-col gap-2 lg:gap-4">
        {messages &&
          messages.map((msg, index) => {
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
              <div
                key={index}
                className="message-line flex flex-row items-end gap-3"
              >
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
  );
};

export default DisplayChat;
