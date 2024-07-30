import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";
import ProfileDetial from "/assets/matchingpage/matching-area/icons/profile detail button.png";
import LeftArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-left.png";
import RightArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-right.png";
import { useMerryLimit } from "../../../hooks/userMerryLimit";
import axios from "axios";
import UserProfilePopup from "./UserProfilePopup";
import useMatching from "../../../hooks/useMatching";
import filter from "/assets/matchingpage/matching-area/filter.png"
import ChatContainer from "../chatcontainer/ChatContainer";
import FilterContainer from "../Filter-area/FilterContainer";

const SwipeCard = () => {
  const currentUserJson = localStorage.getItem("data");
  const currentUser = JSON.parse(currentUserJson);
  const currentUserId = currentUser.id;
  const { setAvailableClicksToday } = useMerryLimit();
  const {
    userQueue,
    setUserQueue,
    availableClicksToday,
    maxDailyQuota,
    addMerry,
    undoMerry,
    getPotentialMatches,
  } = useMatching(currentUserId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for the modal
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPotentialMatches();
  }, []);

  const favourUser = (userId) => {
    addMerry(userId);

      // Update userQueue to remove the user who has been favourited
  setUserQueue(prevQueue => prevQueue.filter(user => user.user_id !== userId));
  };

  const disfavorUser = (userId) => {
    undoMerry(userId); 

    // Update userQueue to shufft the user who has been disfavourited to the last position
    setUserQueue((prevQueue) => prevQueue.filter((user, index) => index !== 0));
  };

  const swiped = (direction, userId) => {
    console.log(`Removing: ${userId}, Direction: ${direction}`);
    // if (direction === 'left') {
    //   disfavorUser(userId);
    // } else if (direction === 'right') {
    //   addMerry(userId);
    // }
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

  const handleProfileDetailClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#160404] w-screen h-screen lg:pt-[88px] pt-[32px] font-Nunito overflow-hidden">
      <div className="absolute bottom-[20px] flex gap-2">
        <div className="flex flex-col justify-center lg:w-0 w-48">
        <button onClick={() => setShowFilter(true)} className="lg:hidden flex gap-2 w-auto z-30">
          <img src={filter} alt="filter" />
          <p className="lg:hidden text-[14px] text-[#646D89] font-light text-center">Filter</p>
        </button>
        </div>
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
            {index === 1 && (
              <div
                className="lg:left-[700px] left-0 lg:top-[248px] top-[40vh] transform -translate-y-1/2 lg:w-[500px] w-screen lg:h-[500px] h-[80vh] rounded-[32px] relative"
                style={{
                  backgroundImage: `url(${user.avatars.image1})`,
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
      <div className="flex justify-center lg:hidden">
      {showFilter && (
        <FilterContainer
          onClose={() => setShowFilter(setShowFilter)}
        />
      )}
      </div>
      
    </div>
  );
};
export default SwipeCard;
