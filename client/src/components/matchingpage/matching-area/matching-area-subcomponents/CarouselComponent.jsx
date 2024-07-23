import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

import { SampleNextArrow } from "./SampleSwipeArrow";
import { SamplePrevArrow } from "./SampleSwipeArrow";

const CarouselComponent = ({ db }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "15%", // This shows 1/3 of the next and previous images
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 1, // Use 1 slide to show
          centerPadding: "0%", // Adjust padding if needed
        },
      },
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1, // Use 1 slide to show
          centerPadding: "0%", // Adjust padding if needed
        },
      },
    ],
  };

  return (
    // set image position: up and down
    <div className="relative -my-64 lg:mt-24">
      <Slider {...settings} className="relative">
        {/* Carousel Images Swipe Card */}
        {db.map((user) => (
          <div key={user.name} className="px-2 relative">
            {/* user image */}
            <img
              src={user.url}
              alt={user.name}
              // set image position: left and right
              className="rounded-3xl w-[620px] sm:mx-[1%] md:mx-[15%] lg:mx-[25%]"
            />
            {/* eye image; mx = Lt/Rt; my= Up/Down */}
            <div className="absolute right-5 mx-3 -my-20 sm:mx-[10%] md:mx-[20%] lg:mx-[27%] xl:mx-[35%] 2xl:mx-[40%]">
              <img src="/assets/matchingpage/matching-area/icons/profile detail button.png" />
            </div>
            {/* set user personal data text position */}
            <p className="absolute bottom-[5%] left-[5%] sm:right-[70%] md:right-[50%] lg:right-[25%] text-center text-white font-bold">
              <span>{user.name}</span>&nbsp;&nbsp;<span>{user.age}</span> <br />
              <span>{user.location}</span>
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
