import MockLeftSidebarComponent from "./matching-area-subcomponents/MockLeftSidebarComponent";
import MockRightSidebarComponent from "./matching-area-subcomponents/MockRightSidebarComponent";
import CarouselComponent from "./matching-area-subcomponents/CarouselComponent";
import MerryLimitToday from "./matching-area-subcomponents/MerryLimitToday";
import ColorFilterComponent from "./matching-area-subcomponents/ColorFilterComponent.jsx";
import BackgroundComponent from "./matching-area-subcomponents/BackgroundComponent.jsx";
import { useMerryLimit } from "../../../contexts/MerryLimitProvider.jsx";


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
  const {
    availableClicksToday,
    setAvailableClicksToday,
    maxDailyQuota,
    setmaxDailyQuota,
  } = useMerryLimit;
  return (
    // set padding space in top direction to allow gap for navbar
    <div className="navbar-padding pt-[52px] lg:pt-[88px] relative w-screen h-screen">
      {/* <MockLeftSidebarComponent /> */}
<<<<<<< HEAD
      {/* <ColorFilterComponent /> */}
      <CarouselComponent db={db} />
      {/* <MerryLimitToday merryLimit={merryLimit} /> */}
      <BackgroundComponent />

=======
      <MockRightSidebarComponent />
      <ColorFilterComponent />
      {/* <CarouselComponent db={db} /> */}
      <MerryLimitToday
        availableClicksToday={availableClicksToday}
        maxDailyQuota={maxDailyQuota}
      />
      {/* <BackgroundComponent /> */}
>>>>>>> 9bb8018 (wip: implement countAvailableClicksToday module)
    </div>
  );
};

export default MatchingArea;
