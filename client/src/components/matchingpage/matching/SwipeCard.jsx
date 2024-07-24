import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";
import ProfileDetial from "/assets/matchingpage/matching-area/icons/profile detail button.png";
import { useMerryLimit } from "../../../contexts/MerryLimitProvider";

const users = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    image: "/assets/matchingpage/matching-area/daeny.png",
  },
  {
    id: 2,
    name: "Pto jaigayray",
    age: 29,
    image: "/assets/matchingpage/matching-area/pto.jpg",
  },
  {
    id: 3,
    name: "Plam jaigayray",
    age: 34,
    image: "/assets/matchingpage/matching-area/plam.jpg",
  },
  // Add more users as needed
];

// import clickQuota, maxDailyQuota from Context API
const SwipeCard = () => {
  const {
    availableClicksToday,
    setAvailableClicksToday,
    maxDailyQuota,
    setMaxDailyQuota,
  } = useMerryLimit();

  const [userQueue, setUserQueue] = useState(users);

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

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#160404] w-screen h-screen pl-[98px] pt-[88px] pb-[32px] font-Nunito">
      <div className="absolute bottom-[20px] flex gap-2">
        <p className="text-[16px] text-[#646D89] font-light text-center">
          Merry limit today:{" "}
        </p>
        <p className="text-[16px] text-[#FF1659] font-light text-center">
          {availableClicksToday}/{maxDailyQuota}
        </p>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        {userQueue.map((user, index) => (
          <div
            key={user.id}
            className={`absolute transition-transform duration-300 ease-in-out transform ${
              index === 0 ? "z-10 scale-100" : "scale-90"
            }`}
          >
            {index === 0 && (
              <TinderCard
                className=" relative transform -translate-x-1/2 -translate-y-1/2"
                onSwipe={(dir) => swiped(dir, user.id)}
                onCardLeftScreen={() => outOfFrame(user.id)}
              >
                <div
                  className="relative flex justify-between bg-slate-500 w-[620px] h-[620px] px-[210px] pt-[572px] rounded-[32px]"
                  style={{
                    backgroundImage: `url(${user.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <button className="text-white w-[100px] h-[100px] rounded-3xl">
                    <img src={XButton} alt="X Button" />
                  </button>
                  <button className="text-white w-[100px] h-[100px] rounded-3xl">
                    <img src={HeartButton} alt="Heart Button" />
                  </button>
                  <div className="absolute bottom-[48px] left-[48px] text-center flex gap-2">
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
                </div>
              </TinderCard>
            )}
            {index === 1 && (
              <div
                className="fixed left-[450px] top-[50%] transform -translate-y-1/2 w-[500px] h-[500px] rounded-[32px]"
                style={{
                  backgroundImage: `url(${user.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            {index === 2 && (
              <div
                className="fixed right-[450px] top-[50%] transform -translate-y-1/2 w-[500px] h-[500px] rounded-[32px]"
                style={{
                  backgroundImage: `url(${user.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default SwipeCard;
