import CarouselComponent from "./CarouselComponent";
import MerryLimitToday from "./MerryLimitToday";

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

const MatchingArea = () => {
  return (
    <div className="navbar-padding pt-[52px] lg:pt-[88px] ">
      <CarouselComponent db={db} />
      <MerryLimitToday />
    </div>
  );
};

export default MatchingArea;

{
  db.map((item) => (
    <div key={item.name} className="px-2 relative">
      <img src={item.url} alt={item.name} className="rounded-3xl w-full" />
    </div>
  ));
}
