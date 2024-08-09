import { useEffect, useState } from "react";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import { useMatch } from "../../contexts/matchProvider";
import filter from "/assets/matchingpage/matching-area/filter.png";

function MatchingPage() {
  // const currentUserJson = localStorage.getItem("data");
  // const currentUser = JSON.parse(currentUserJson);
  // const currentUserId = currentUser.id;
  // const { allUser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
  //   useMatch();
  const { allUser } = useMatch();
  const [userQueue, setUserQueue] = useState([]);
  const [Queue, setQueue] = useState(allUser);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (allUser) {
      setQueue(allUser);
    }
  }, [allUser]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:flex ">
        <ChatContainer />
      </div>
      <SwipeCard
        Queue={Queue}
        setQueue={setQueue}
        userQueue={userQueue}
        setUserQueue={setUserQueue}
      />
      <div className={`${showFilter ? "flex" : "hidden"} lg:flex`}>
        <FilterContainer
          Queue={Queue}
          setQueue={setQueue}
          userQueue={userQueue}
          setUserQueue={setUserQueue}
          setShowFilter={setShowFilter}
        />
      </div>
      <div className="absolute bottom-0 lg:w-0 w-48">
        <button
          onClick={() => setShowFilter(true)}
          className="lg:hidden flex gap-2 w-auto z-30"
        >
          <img src={filter} alt="filter" />
          <p className="lg:hidden text-[14px] text-[#646D89] font-light text-center">
            Filter
          </p>
        </button>
      </div>
    </div>
  );
}
export default MatchingPage;
