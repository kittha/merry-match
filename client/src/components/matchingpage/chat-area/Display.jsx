import { useEffect } from "react";
import matched from "/assets/matchingpage/merry-match-icon.png";

const DisplayChat = ({ messages, userId, anotherUser }) => {
  // console.log(messages);

  useEffect(() => {
    const scrollToBottom = () => {
      const element = document.getElementsByTagName("main")[0];
      const hight = element.scrollHeight;
      // console.log("element", element, "hight", hight);
      element.scrollTo({ top: hight });
    };
    scrollToBottom();
    // console.log("scrollEffect");
  }, [messages]);

  return (
    <main className="display-section box-border h-fit w-full py-6 lg:py-10 px-4 lg:px-[60px] flex-1 flex flex-col gap-7 lg:gap-12 justify-between items-center overflow-y-auto overflow-x-hidden">
      <div className="headbox max-w-[749px] w-fit lg:h-[90px] bg-[#F4EBF2] border border-[#DF89C6] rounded-2xl py-3 px-4 lg:py-6 lg:px-0 flex flex-row gap-4 lg:gap-6 justify-center items-center">
        <img
          src={matched}
          alt="merry-match-icon"
          className="ml-0 lg:ml-20 w-10 h-6 lg:w-[60px] lg:h-[35px]"
        />
        <p className="mr-0 lg:mr-20 text-[#64001D] text-xs leading-[18px] lg:text-sm font-Nunito font-medium">
          Now you and {anotherUser.name} are Merry Match!
          <br />
          You can messege something nice and make a good conversation. Happy
          Merry!
        </p>
      </div>

      <div className="message w-full flex flex-col-reverse gap-2 lg:gap-4">
        {messages &&
          messages.map((msg, index) => {
            return msg.sender === userId ? (
              // owner bubble
              <div
                key={index}
                className="message-line w-full flex flex-row-reverse items-end gap-1"
              >
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit break-words rounded-3xl rounded-br-none bg-[#7D2262] py-3 lg:py-4 px-6 text-white">
                  {msg.message}
                  {msg.media && (
                    <img
                      src={msg.media}
                      alt={`picture-message-${index}`}
                      className="image w-52 my-2"
                    />
                  )}
                </div>
                <div>
                  {/* <p className="date text-[#f4ebf2]">
                    {new Date(msg.dateTime).toLocaleDateString("en-GB")}
                  </p> */}
                  <p className="time text-[#f4ebf2] opacity-50 text-sm">
                    {new Date(msg.dateTime).toLocaleTimeString([], {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              // other user bubble
              <div
                key={index}
                className="message-line w-full flex flex-row items-end gap-1"
              >
                <img
                  src={anotherUser.avatars["image1"]}
                  alt="profile-image"
                  className="profile-pic bg-slate-400 w-10 h-10 aspect-square object-cover rounded-full mr-2"
                />
                <div className="message-box max-w-[70%] lg:max-w-[50%] w-fit h-fit break-words rounded-3xl rounded-bl-none bg-[#EFC4E2] py-3 lg:py-4 px-6">
                  {msg.message}
                  {msg.media && (
                    <img
                      src={msg.media}
                      alt={`picture-message-${index}`}
                      className="image w-52 my-2"
                    />
                  )}
                </div>
                <div>
                  {/* <p className="date text-[#f4ebf2]">
                    {new Date(msg.dateTime).toLocaleDateString("en-GB")}
                  </p> */}
                  <p className="time text-[#f4ebf2] opacity-50 text-sm">
                    {new Date(msg.dateTime).toLocaleTimeString([], {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default DisplayChat;
