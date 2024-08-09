import { useEffect, useState } from "react";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import { useMatch } from "../../hooks/useMatch";
import filter from "/assets/matchingpage/matching-area/filter.png";

function MatchingPage() {
  // const currentUserJson = localStorage.getItem("data");
  // const currentUser = JSON.parse(currentUserJson);
  // const currentUserId = currentUser.id;
  // const { allUser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
  //   useMatch();
  const { user } = useMatch();
  const [userQueue, setUserQueue] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [Queue, setQueue] = useState(user);

  useEffect(() => {
    if (user) {
      setQueue(user);
    }
  }, [user]);

  return (
    <div className="flex lg:flex-row">
      <div className="hidden lg:flex ">
        <ChatContainer />
      </div>
      <SwipeCard
        Queue={Queue}
        setQueue={setQueue}
        userQueue={userQueue}
        setUserQueue={setUserQueue}
      />
      <div className={`${showFilter ? "" : "hidden"} lg:flex`}>
        <FilterContainer
          Queue={Queue}
          setQueue={setQueue}
          userQueue={userQueue}
          setUserQueue={setUserQueue}
          setShowFilter={setShowFilter}
        />
      </div>
      <div className="absolute bottom-[20px] sm:left-auto left-4 flex gap-2">
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
