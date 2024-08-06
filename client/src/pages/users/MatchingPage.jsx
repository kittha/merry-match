import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import { useMatch } from "../../contexts/matchProvider";

function MatchingPage() {
  // const currentUserJson = localStorage.getItem("data");
  // const currentUser = JSON.parse(currentUserJson);
  // const currentUserId = currentUser.id;
  // const { allUser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
  //   useMatch();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:flex ">
        <ChatContainer />
      </div>
      <SwipeCard />
      <div className="hidden lg:flex">
        <FilterContainer />
      </div>
    </div>
  );
}
export default MatchingPage;
