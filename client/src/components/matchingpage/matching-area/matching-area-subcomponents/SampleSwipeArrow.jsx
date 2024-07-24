import LeftArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-left.png";
import RightArrowIcon from "/assets/matchingpage/matching-area/icons/arrow-right.png";

import "./ImageCarousel.css";

// set ArrowPosition at ./ImageCarousel.css

export function SampleNextArrow(props) {
  
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow absolute bottom-16 right-[116px]`}
      onClick={onClick}
    >
      <img src={RightArrowIcon} alt="Next" />
    </div>
  );
}

export function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow absolute bottom-16 right-[156px]`}    
      onClick={onClick}
    >
      <img src={LeftArrowIcon} alt="Prev" />
    </div>
  );
}
