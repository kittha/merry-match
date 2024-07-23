import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SampleNextArrow } from "./SampleSwipeArrow";
import { SamplePrevArrow } from "./SampleSwipeArrow";

const CarouselComponent = ({ db }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "15%", // This shows 1/3 of the next and previous images
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="relative z-10">
      <Slider {...settings} className="relative">
        {db.map((user) => (
          <div key={user.name} className="px-2 relative">
            <img
              src={user.url}
              alt={user.name}
              className="rounded-3xl  w-full lg:w-[620px]"
            />
            <p className="absolute bottom-10 left-10 right-0 text-left text-white font-bold">
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
