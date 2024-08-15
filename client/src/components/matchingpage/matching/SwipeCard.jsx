import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";
import ProfileDetial from "/assets/matchingpage/matching-area/icons/profile detail button.png";
import LeftArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-left.png";
import RightArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-right.png";
import exit from "/assets/profilepicture/exit.png";
import UserProfilePopup from "./UserProfilePopup";
import mmLogo from "/assets/matchingpage/matching-area/merryMatch.gif";
import { useMatch } from "../../../hooks/useMatch";

const SwipeCard = ({ Queue, setQueue, userQueue, setUserQueue }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for the modal

  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const navigate = useNavigate();

  const { alluser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
    useMatch();

  useEffect(() => {
    if (!Queue) return;

    const validMatches = Queue.filter((user) => {
      if (user.user_id !== user.match_user_id_1) {
        return (
          user.match_status_1 !== "merry" && user.match_status_1 !== "match"
        );
      } else if (user.user_id !== user.match_user_id_2) {
        return (
          user.match_status_2 !== "merry" && user.match_status_2 !== "match"
        );
      }
    });
    // console.log(validMatches);

    const newQueue = [
      ...validMatches.slice(currentIndex),
      ...validMatches.slice(0, currentIndex),
    ];

    setUserQueue(newQueue);
  }, [Queue, currentIndex]);

  // console.log(userQueue);

  const favourUser = async (userId) => {
    if (availableClicksToday < maxDailyQuota) {
      const data = await addMerry(userId);

      // Log a message if the match is successful
      if (data.status_1 === "match") {
        const matchedUser = Queue.find(
          (user) =>
            (user.user_id === data.user_id_1 ||
              user.user_id === data.user_id_2) &&
            user.match_id === data.match_id
        );

        if (matchedUser) {
          // console.log(`Users matched: ${data.user_id_1} and ${data.user_id_2}`);
          setSelectedUser(matchedUser);
          setShowMatchPopup(true);
        }
      }
      setUserQueue((prevQueue) => {
        const newQueue = [...prevQueue.slice(1)];
        return newQueue;
      });
    } else {
      alert("You don't have any more clicks today");
    }
  };

  const disfavorUser = (userId) => {
    undoMerry(userId);

    // Update userQueue to shufft the user who has been disfavourited to the last position
    setUserQueue((prevQueue) => prevQueue.filter((user, index) => index !== 0));
  };

  const swiped = (direction, userId) => {
    // console.log(`Removing: ${userId}, Direction: ${direction}`);
    if (direction === "left") {
      disfavorUser(userId);
    } else if (direction === "right") {
      favourUser(userId);
    }
    setUserQueue((prevQueue) => {
      const newQueue = [...prevQueue.slice(1), prevQueue[0]]; // Move the first user to the end
      return newQueue;
    });
  };

  const outOfFrame = (userId) => {
    // console.log(`${userId} left the screen`);
  };

  const handlePrevious = () => {
    setUserQueue((prevQueue) => {
      const newQueue = [
        prevQueue[prevQueue.length - 1],
        ...prevQueue.slice(0, -1),
      ];
      return newQueue;
    });
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? userQueue.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setUserQueue((prevQueue) => {
      const newQueue = [...prevQueue.slice(1), prevQueue[0]];
      return newQueue;
    });
    setCurrentIndex((prevIndex) =>
      prevIndex === userQueue.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleProfileDetailClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleGotoChat = (matchId) => {
    navigate(`/chat/${matchId}`);
  };

  const handleMatchPopupClose = () => {
    setShowMatchPopup(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#160404] w-screen h-screen lg:pt-[88px] pt-[32px] font-Nunito overflow-hidden">
      <div className="absolute bottom-[20px] sm:right-auto right-4 flex gap-2">
        {/* <div className="flex flex-col justify-center lg:w-0 w-48">
          <button
            onClick={() => setShowFilter(true)}
            className="lg:hidden flex gap-2 w-auto z-30"
          >
            <img src={filter} alt="filter" />
            <p className="lg:hidden text-[14px] text-[#646D89] font-light text-center">
              Filter
            </p>
          </button>
        </div> */}
        <div className="flex float-col gap-2">
          <p className="lg:text-[16px] text-[14px] text-[#646D89] font-light text-center ">
            Merry limit today:{" "}
          </p>
          <p className="lg:text-[16px] text-[#FF1659] font-light text-center">
            {availableClicksToday}/{maxDailyQuota}
          </p>
        </div>
      </div>
      <div className="relative w-full h-full flex lg:items-center items-start justify-center">
        {userQueue.map((user, index) => (
          <div
            key={user.user_id}
            className={`absolute transition-transform duration-300 ease-in-out transform ${
              index === 0 ? "z-10 scale-100" : "scale-90"
            }`}
          >
            {index === 0 && (
              <TinderCard
                className=" relative transform -translate-x-1/2 -translate-y-1/2 "
                onSwipe={(dir) => swiped(dir, user.user_id)}
                onCardLeftScreen={() => outOfFrame(user.user_id)}
              >
                <div
                  className="relative bg-slate-500 lg:w-[620px] w-screen lg:h-[620px] h-[80vh] lg:rounded-[32px] rounded-[24px]"
                  style={{
                    backgroundImage: `url(${user.avatars.image1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-[310px] inset-0  bg-gradient-to-b from-[#07094100] to-[#390741] opacity-100 lg:rounded-[28px] rounded-[24px]"></div>
                  <div className="flex justify-center absolute -bottom-12 w-full">
                    <button
                      className="text-white w-[100px] h-[100px] rounded-3xl z-10"
                      onClick={() => disfavorUser(user.user_id)}
                    >
                      <img src={XButton} alt="X Button" />
                    </button>
                    <button
                      className="text-white w-[100px] h-[100px] rounded-3xl z-10"
                      onClick={() => favourUser(user.user_id)}
                    >
                      <img src={HeartButton} alt="Heart Button" />
                    </button>
                  </div>

                  <div className="absolute lg:bottom-[48px] lg:left-[48px] bottom-[96px] left-[24px] text-center flex gap-2 z-10">
                    <p className="text-[32px] text-white font-semibold">
                      {user.name}
                    </p>
                    <p className="text-[32px] text-[#D6D9E4] font-semibold">
                      {user.age}
                    </p>
                    <button
                      className="w-[48px]"
                      onClick={() => handleProfileDetailClick(user)}
                    >
                      <img src={ProfileDetial} alt="ProfileDetial" />
                    </button>
                  </div>
                  <div className="absolute bottom-[54px] right-[24px] z-10 hidden lg:flex">
                    <button className="w-[48px]" onClick={handlePrevious}>
                      <img src={LeftArrowIcon} alt="LeftArrowIcon" />
                    </button>
                    <button className="w-[48px]" onClick={handleNext}>
                      <img src={RightArrowIcon} alt="RightArrowIcon" />
                    </button>
                  </div>
                </div>
              </TinderCard>
            )}
            {index === userQueue.length - 1 && userQueue.length > 1 && (
              <div
                className="lg:right-[700px] right-0 lg:top-[248px] top-[40vh] transform -translate-y-1/2 lg:w-[500px] w-screen lg:h-[500px] h-[80vh] rounded-[32px] relative"
                style={{
                  backgroundImage: `url(${user.avatars.image1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#390741] rounded-[28px]"></div>
              </div>
            )}
            {index === 1 && userQueue.length > 2 && (
              <div
                className="hidden lg:block lg:left-[700px] left-0 lg:top-[248px] top-[40vh] transform -translate-y-1/2 lg:w-[500px] w-screen lg:h-[500px] h-[80vh] rounded-[32px] relative"
                style={{
                  backgroundImage: `url(${user.avatars.image1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#390741] rounded-[28px]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <UserProfilePopup
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
      {showMatchPopup && selectedUser && (
        <div className="absolute z-30">
          <div className=" relative">
            <img
              src={selectedUser.avatars.image1}
              alt="Matched User"
              className="inset-0 object-cover lg:w-[700px] lg:h-[700px] w-screen h-screen rounded-[32px] bg-white"
              style={{ transform: "scale(1.1)" }}
            />
            <div className="absolute -inset-10 bg-gradient-to-b from-transparent to-[#390741] rounded-[28px]"></div>
            <div className=" absolute top-1/2 flex w-full justify-center">
              <img src={mmLogo} alt="match_logo" />
            </div>
            <div className=" absolute bottom-24 flex w-full justify-center">
              <button
                onClick={() => {
                  handleGotoChat(selectedUser.match_id);
                }}
                className="bg-[#FFE1EA] text-[#95002B] rounded-full w-[188px] h-[48px]"
              >
                Start Conversation
              </button>
            </div>
            <button
              onClick={handleMatchPopupClose}
              className=" absolute top-0 right-0 bg-[#95002B] rounded-full"
            >
              <img className="hidden lg:block" src={exit} alt="exit" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SwipeCard;
