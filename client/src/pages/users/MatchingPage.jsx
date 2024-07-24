import ChatContainer from "../../components/matchingpage/chatcontainer/ChatContainer";
import MockRightSidebarComponent from "../../components/matchingpage/matching-area/matching-area-subcomponents/MockRightSidebarComponent";
import SwipeCard from "../../components/matchingpage/matching/SwipeCard";


function MatchingPage() {
  return (
    <>
            <ChatContainer />
            <SwipeCard />
            <MockRightSidebarComponent />
    </>
  );
}
export default MatchingPage;
