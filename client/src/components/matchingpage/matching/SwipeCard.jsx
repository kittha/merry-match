import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";
import ProfileDetial from "/assets/matchingpage/matching-area/icons/profile detail button.png";
import LeftArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-left.png";
import RightArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-right.png";
import { useMerryLimit } from "../../../contexts/MerryLimitProvider";
import axios from "axios";

// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 28,
//     image: "/assets/matchingpage/matching-area/daeny.png",
//   },
//   {
//     id: 2,
//     name: "Pto jaigayray",
//     age: 29,
//     image: "/assets/matchingpage/matching-area/pto.jpg",
//   },
//   {
//     id: 3,
//     name: "Plam jaigayray",
//     age: 34,
//     image: "/assets/matchingpage/matching-area/plam.jpg",
//   },
//   // Add more users as needed
// ];

// import clickQuota, maxDailyQuota from Context API
const SwipeCard = () => {
  const { availableClicksToday, maxDailyQuota } = useMerryLimit();
  const currentUserJson = localStorage.getItem("data");
  const currentUser = JSON.parse(currentUserJson);
  const currentUserId = currentUser.id;
  const [userQueue, setUserQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getPotentialMatches = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/merry/match/${currentUserId}`
        );
        if (Array.isArray(response.data.matches.matches)) {
          // console.log(response.data.matches.matches);
          setUserQueue(response.data.matches.matches);
        } else {
          // console.log(response.data);
          console.error("API response is not an array:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch potential matches:", error);
      }
    };
    getPotentialMatches();
  }, [currentUserId]);

  const swiped = (direction, userId) => {
    console.log(`Removing: ${userId}, Direction: ${direction}`);
    setUserQueue((prevQueue) => {
      const newQueue = [...prevQueue.slice(1), prevQueue[0]]; // Move the first user to the end
      return newQueue;
    });
  };

  const outOfFrame = (userId) => {
    console.log(`${userId} left the screen`);
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

  // Heart Button: When clicked, it will deduct from today's merry quota.
  const addMerry = async (userId) => {
    // console.log("I'm clicked 1");
    // console.log("curUser click addMerry to other userId no: ", userId);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry/addMerry`,
        { userId: currentUserId, merryUserId: userId }
      );
    } catch (error) {
      console.error("Failed to add merry:", error);
    }
  };

  // X Button: when click will move the first user to the end of the row
  const disfavorUser = (userId) => {
    // console.log("I'm clicked 2");
    // console.log("curUser click disfavourUser to other userId no: ", userId);
    console.log(userId);
    setUserQueue((prevQueue) => {
      const newQueue = [...prevQueue.slice(1), prevQueue[0]]; // Move the first user to the end
      return newQueue;
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#160404] w-screen h-screen pl-[98px] pt-[88px] pb-[32px] font-Nunito">
      <div className="absolute bottom-[20px] flex gap-2">
        <p className="text-[16px] text-[#646D89] font-light text-center">
          Merry limit today:{" "}
        </p>
        <p className="text-[16px] text-[#FF1659] font-light text-center">
          {availableClicksToday ? availableClicksToday : null}/
          {maxDailyQuota ? maxDailyQuota : null}
        </p>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
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
                  className="relative flex justify-between bg-slate-500 w-[620px] h-[620px] px-[210px] pt-[572px] rounded-[32px]"
                  style={{
                    backgroundImage: `url(${user.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-[310px] inset-0 h-[50%] bg-gradient-to-b from-[#07094100] to-[#390741] opacity-100 rounded-[28px]"></div>
                  <button
                    className="text-white w-[100px] h-[100px] rounded-3xl z-10"
                    onClick={() => disfavorUser(user.user_id)}
                  >
                    <img src={XButton} alt="X Button" />
                  </button>
                  <button
                    className="text-white w-[100px] h-[100px] rounded-3xl z-10"
                    onClick={() => addMerry(user.user_id)}
                  >
                    <img src={HeartButton} alt="Heart Button" />
                  </button>
                  <div className="absolute bottom-[48px] left-[48px] text-center flex gap-2 z-10">
                    <p className="text-[32px] text-white font-semibold">
                      {user.name}
                    </p>
                    <p className="text-[32px] text-[#D6D9E4] font-semibold">
                      {user.age}
                    </p>
                    <button className="w-[48px]" onClick={() => navigate("/")}>
                      <img src={ProfileDetial} alt="ProfileDetial" />
                    </button>
                  </div>
                  <div className="absolute bottom-[46px] right-[24px] z-10">
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
            {index === 1 && (
              <div
                className="left-[700px] top-[248px] transform -translate-y-1/2 w-[500px] h-[500px] rounded-[32px] relative"
                style={{
                  backgroundImage: `url(${user.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#390741] rounded-[28px]"></div>
              </div>
            )}

            {index === 2 && (
              <div
                className="right-[700px] top-[248px] transform -translate-y-1/2 w-[500px] h-[500px] rounded-[32px] relative"
                style={{
                  backgroundImage: `url(${user.image})`,
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
    </div>
  );
};
export default SwipeCard;
