import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";


function MatchingPage() {
  return (
    <>
    <div className="flex">
            <ChatContainer />
            <SwipeCard />
            <FilterContainer />

    </div>
            
    </>
  );
}
export default MatchingPage;
