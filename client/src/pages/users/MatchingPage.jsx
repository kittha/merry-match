import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import useMatching from "../../hooks/useMatching";

function MatchingPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:flex ">
          <ChatContainer />
        </div>
        <SwipeCard />
        <div className="hidden lg:flex">
          <form>
            <FilterContainer />
          </form>
        </div>
      </div>
    </>
  );
}
export default MatchingPage;
