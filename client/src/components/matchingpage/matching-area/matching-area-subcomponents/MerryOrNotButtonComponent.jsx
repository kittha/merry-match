import XButton from "/assets/matchingpage/matching-area/icons/action-button-x.png";
import HeartButton from "/assets/matchingpage/matching-area/icons/action-button-heart.png";

function MerryOrNotButtonComponent() {
  return (
    <div className="flex justify-center bg-red-400">
      <img src={XButton} />
      <img src={HeartButton} />
    </div>
  );
}

export default MerryOrNotButtonComponent;
