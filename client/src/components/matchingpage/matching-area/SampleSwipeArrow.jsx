import LeftArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-left.png";
import RightArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-right.png";

import "./ImageCarousel.css";

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{
        ...style,
        display: "block",
        background: "none",
        position: "absolute",
        bottom: "10px",
        right: "10px",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <img src={RightArrowIcon} alt="Next" />
    </div>
  );
}

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{
        ...style,
        display: "block",
        background: "none",
        position: "absolute",
        bottom: "10px",
        left: "10px",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <img src={LeftArrowIcon} alt="Prev" />
    </div>
  );
}
