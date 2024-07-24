import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";
import ProfileDetial from "/assets/matchingpage/matching-area/icons/profile detail button.png";

const users = [
  { id: 1, name: 'John Doe', age: 28, image: '/assets/matchingpage/matching-area/daeny.png' },
  { id: 2, name: 'Pto jaigayray', age: 29, image: '/assets/matchingpage/matching-area/pto.jpg' },
  { id: 3, name: 'Plam jaigayray', age: 34, image: '/assets/matchingpage/matching-area/plam.jpg' },
  // Add more users as needed
];

const SwipeCard = () => {
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);

  const swiped = (direction, userId) => {
    console.log(`Removing: ${userId}, Direction: ${direction}`);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const outOfFrame = (userId) => {
    console.log(`${userId} left the screen`);
  };

    return (
        <div className="relative flex flex-col items-center justify-center bg-[#160404] w-screen h-screen pl-[98px] pt-[88px] pb-[32px] font-Nunito">
          
          <div className="absolute bottom-[20px] flex gap-2">
            <p className="text-[16px] text-[#646D89] font-light text-center">Merry limit today: </p>
            <p className="text-[16px] text-[#FF1659] font-light text-center">0/20</p>
          </div>
          {users.map((user, index) => (
            index === currentIndex && (
              <TinderCard
                key={user.id}
                className="absolute"
                onSwipe={(dir) => swiped(dir, user.id)}
                onCardLeftScreen={() => outOfFrame(user.id)}
              >
                <div 
                  className="relative flex justify-between bg-slate-500 w-[620px] h-[620px] px-[210px] pt-[572px] rounded-[32px]"
                  style={{ backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
              
                  <button className=" text-white w-[100px] h-[100px] rounded-3xl">
                    <img src={XButton} alt="X Button" />
                  </button>
                  <button className=" text-white w-[100px] h-[100px] rounded-3xl">
                    <img src={HeartButton} alt="Heart Button" />
                  </button>
                  <div className="absolute bottom-[48px] left-[48px] text-center flex gap-2">
                    <p className="text-[32px] text-white font-semibold">{user.name}</p>
                    <p className="text-[32px] text-[#D6D9E4] font-semibold">{user.age}</p>
                    <button 
                      className="w-[48px]"
                      onClick={() => navigate("/")} 
                    >
                      <img src={ProfileDetial} alt="ProfileDetial" />
                    </button>
                  </div>
                </div>
              </TinderCard>
            )
          ))}
        </div>
           
    )
  };
export default SwipeCard;