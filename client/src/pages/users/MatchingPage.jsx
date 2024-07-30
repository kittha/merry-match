import { useState } from "react";
import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import FilterContainer from "../../components/matchingpage/Filter-area/FilterContainer";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";


function MatchingPage() {  
  return (
    <>
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:flex ">
        <ChatContainer />
      </div>
        <SwipeCard />
      <div className="hidden lg:flex">
        <FilterContainer />
      </div>
    </div>
            
    </>
  );
}
export default MatchingPage;
