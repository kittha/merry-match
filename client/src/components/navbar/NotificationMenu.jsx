import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileMenu1 from "/assets/navbar-image/profile_menu1.png";

const NotificationMenu = ({ bellMenuOpen, bellMenuPosition, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!bellMenuOpen) {
    return null;
  }

  return (
        <div
          style={{
            position: "fixed",
            top: `${bellMenuPosition.top}px`,
            left: `${bellMenuPosition.left}px`,
            transform: "translateX(-50%)",
            marginTop: "32px",
          }}
          className="w-[250px] h-[215px] font-[500] bg-white shadow-lg rounded-[16px] py-2 z-10 font-Nunito text-sm"
        >
          <div className="flex items-center h-[66px] p-[8px]">
            <img
              src={profileMenu1}
              alt="icon2"
              className="ml-1 mr-3 h-[32px] w-[32px]"
            />
            <button onClick={() => navigate("/")} className="text-start">
              ‘Khal Drogo’ Just Merry you! Click here to see profile
            </button>
          </div>
        </div>
  );
};

export default NotificationMenu;
