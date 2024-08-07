import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import discover from "/assets/matchingpage/chatArea/discover-vector.png";
import matched from "/assets/matchingpage/chatArea/merry-match.png";
import { useMatch } from "../../../contexts/matchProvider";
import { useChat } from "../../../contexts/chatProvider";

const ChatContainer = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const { allUser } = useMatch();
  const { lastMsg } = useChat();
  console.log("lastMsg", lastMsg);
  useEffect(() => {
    const validMatches = allUser
      .filter((match) => match.match_status_1 === "match")
      .sort((a, b) => {
        a.match_matched_at = new Date(a.match_matched_at);
        b.match_matched_at = new Date(b.match_matched_at);
        // console.log("a", a, "b", b);
        return b.match_matched_at - a.match_matched_at;
      });
    console.log(validMatches);
    setMatches(validMatches);
  }, [allUser]);

  return (
    <div className="w-screen lg:w-[314px] h-screen bg-white shadow-2xl flex flex-col lg:pt-[88px] pt-[52px] font-Nunito z-20">
      <div className="discover flex justify-center h-[216px] lg:h-[259px] px-[15px] py-[20px] lg:py-[36px]">
        <button className="flex flex-col items-center justify-center text-center w-[343px] lg:w-[282px] h-[187px] rounded-[16px] border-[1px] border-[#A62D82] bg-white">
          <img src={discover} alt="Discover" />
          <p className="text-[24px] font-bold text-[#95002B]">
            Discover New Match
          </p>
          <p className="text-[14px] font-medium text-[#646D89]">
            start find and Merry to get know
          </p>
          <p className="text-[14px] font-medium text-[#646D89]">
            and connect with new friend!
          </p>
        </button>
      </div>
      <div className="merry-match flex justify-center bg-white px-[15px] py-[16px] lg:py-[24px]">
        <div className="flex flex-col justify-start gap-[16px] w-[343px] lg:w-[282px]">
          <p className="text-[24px] font-bold text-[#2A2E3F]">Merry Match!</p>
          <div className="flex flex-row overflow-x-auto">
            <div className="flex flex-nowrap gap-[12px]">
              {matches.map((match) => (
                <button
                  key={match.user_id}
                  className="relative usermatch bg-white w-[100px] h-[100px] rounded-[24px]"
                  onClick={() => navigate(`/chat/${match.match_id}`)}
                >
                  <img
                    src={match.avatars.image1}
                    alt="profile"
                    className="w-full h-full aspect-square object-cover rounded-[24px]"
                  />
                  <img
                    src={matched}
                    alt="matched"
                    className=" absolute bottom-0.5 right-0.5"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="chat-with-match flex justify-center overflow-auto bg-white px-[15px]">
        <div className="flex flex-col justify-start w-[343px] lg:w-[282px]">
          <p className="text-[24px] font-bold text-[#2A2E3F] sticky top-0 z-10 bg-white py-[16px]">
            Chat with Merry Match
          </p>
          <div className="flex flex-col gap-[8px]">
            {lastMsg &&
              matches &&
              lastMsg.map((msg) => {
                const index = matches.findIndex(
                  (match) => match.match_id === msg.matchId
                );

                return index !== -1 ? (
                  <button
                    key={matches[index].user_id}
                    className=" w-auto h-[92px] rounded-[16px] bg-white border-0 hover:border-[1px] hover:border-[#A62D82] hover:bg-[#F6F7FC] focus:outline-none"
                    onClick={() => navigate(`/chat/${msg.matchId}`)}
                  >
                    <div className="flex gap-[12px] mx-[12px] my-[16px]">
                      <img
                        src={matches[index].avatars.image1}
                        alt="profile"
                        className="h-[60px] w-[60px] aspect-square object-cover rounded-full"
                      />
                      <div className="flex flex-col text-left justify-center">
                        <p className="text-[16px] font-medium text-[#2A2E3F]">
                          {matches[index].name}
                        </p>
                        <p className="text-[14px] font-medium text-[#646D89] truncate w-[230px] lg:w-[180px]">
                          {msg.message ?? "sent a photo"}
                        </p>
                      </div>
                    </div>
                  </button>
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
