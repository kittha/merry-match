import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import useMatching from "../../hooks/useMatching";

function MatchingPage() {
  const currentUserJson = localStorage.getItem("data");
  const currentUser = JSON.parse(currentUserJson);
  const currentUserId = currentUser.id;
  const { allUser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
    useMatching(currentUserId);

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:flex ">
          <ChatContainer allUser={allUser} />
        </div>
        <SwipeCard
          allUser={allUser}
          availableClicksToday={availableClicksToday}
          maxDailyQuota={maxDailyQuota}
          addMerry={addMerry}
          undoMerry={undoMerry}
        />
        <div className="hidden lg:flex">
          <FilterContainer />
        </div>
      </div>
    </>
  );
}
export default MatchingPage;
