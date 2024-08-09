import { useEffect, useState } from "react";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";
import { useMatch } from "../../hooks/useMatch";

function MatchingPage() {
  // const currentUserJson = localStorage.getItem("data");
  // const currentUser = JSON.parse(currentUserJson);
  // const currentUserId = currentUser.id;
  // const { allUser, availableClicksToday, maxDailyQuota, addMerry, undoMerry } =
  //   useMatch();
  const { allUser } = useMatch();
  const [userQueue, setUserQueue] = useState([]);
  const [Queue, setQueue] = useState(allUser);

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
      <div className="hidden lg:flex">
        <FilterContainer
          Queue={Queue}
          setQueue={setQueue}
          userQueue={userQueue}
          setUserQueue={setUserQueue}
        />
      </div>
    </div>
  );
}
export default MatchingPage;
