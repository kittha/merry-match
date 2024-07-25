import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";
import MerryOrNotButtonComponent from "./MerryOrNotButtonComponent";

import { SampleNextArrow } from "./SampleSwipeArrow";
import { SamplePrevArrow } from "./SampleSwipeArrow";

const CarouselComponent = ({ db }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.7, // set images gap
    slidesToScroll: 1,
    centerPadding: "10%", // This shows 1/3 of the next and previous images
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
          slidesToShow: 5, // Use 1 slide to show
          centerPadding: "0%", // Adjust padding if needed
        },
      },
    ],
  };

  return (
    // set image position: mt = carousel up and down; mx = carousel left and right;
    <div className="relative w-screen mx-0 my-0 lg:mt-24">
      <Slider {...settings} className=" relative ml-44">
        {/* Carousel Images Swipe Card Module */}
        {db.map((user) => (
          <div key={user.name} className="px-2 relative">
            {/* user image */}
            <img
              src={user.url}
              alt={user.name}
              // set IMAGE position: left and right
              // className="rounded-3xl w-[620px] sm:mx-[1%] md:mx-[15%] lg:mx-[25%]"
              className="rounded-3xl w-[620px] h-[620px] object-cover mx-auto"
            />
            {/* eye image; mx = Lt/Rt; my= Up/Down */}
            <div className="absolute top-0 right-0 m-5">
              <img src="/assets/matchingpage/matching-area/icons/profile detail button.png" />
            </div>
            {/* set user personal data text position */}
            <p className="absolute bottom-10 left-10 text-center text-white font-bold">
              <span>{user.name}</span>&nbsp;&nbsp;<span>{user.age}</span> <br />
              <span>{user.location}</span>
            </p>
          </div>
        ))}
      </Slider>
      <MerryOrNotButtonComponent />
    </div>
  );
};

export default CarouselComponent;
