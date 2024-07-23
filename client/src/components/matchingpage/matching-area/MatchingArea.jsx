import MockLeftSidebarComponent from "./matching-area-subcomponents/MockLeftSidebarComponent";
import MockRightSidebarComponent from "./matching-area-subcomponents/MockRightSidebarComponent";
import CarouselComponent from "./matching-area-subcomponents/CarouselComponent";
import MerryLimitToday from "./matching-area-subcomponents/MerryLimitToday";
import ColorFilterComponent from "./matching-area-subcomponents/ColorFilterComponent.jsx";
import BackgroundComponent from "./matching-area-subcomponents/BackgroundComponent.jsx";

const db = [
  {
    name: "First Item",
    age: 20,
    location: "KFC",
    url: "/assets/matchingpage/matching-area/daeny.png",
  },
  {
    name: "Second Item",
    age: 40,
    location: "ChesterGrill",
    url: "/assets/matchingpage/matching-area/daeny2.png",
  },
  {
    name: "Third Item",
    age: 60,
    location: "MCDonald",
    url: "/assets/matchingpage/matching-area/daeny3.png",
  },
];

const merryLimit = 20;

const MatchingArea = () => {
  return (
    // set padding space in top direction to allow gap for navbar
    <div className="navbar-padding pt-[52px] lg:pt-[88px] relative">
      <MockLeftSidebarComponent />
      <MockRightSidebarComponent />
      <BackgroundComponent />
      <CarouselComponent db={db} />
      <MerryLimitToday merryLimit={merryLimit} />
      <BackgroundComponent />
    </div>
  );
};

export default MatchingArea;
