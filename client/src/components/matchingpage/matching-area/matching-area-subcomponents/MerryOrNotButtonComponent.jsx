import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";

function MerryOrNotButtonComponent() {
  return (
    // set x & heart BUTTON position: -bottom = up/down; left- = left/right
    <div className="absolute -bottom-10 left-[800px] transform -translate-x-1/2 z-50 flex ">
      <img src={XButton} alt="X Button" className="w-20 h-20" />
      <img src={HeartButton} alt="Heart Button" className="w-20 h-20" />
    </div>
  );
}

export default MerryOrNotButtonComponent;
