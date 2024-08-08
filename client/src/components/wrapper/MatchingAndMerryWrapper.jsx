import PropTypes from 'prop-types'; 
import { MatchProvider } from "../../contexts/matchProvider";
import { MerryLimitProvider } from "../../contexts/MerryLimitProvider";
import { ChatProvider } from "../../contexts/chatProvider";

const MatchingAndMerryWrapper = ({ children }) => {
  return (
    <MerryLimitProvider>
      <MatchProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </MatchProvider>
    </MerryLimitProvider>
  );
};

MatchingAndMerryWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default MatchingAndMerryWrapper;
