import PropTypes from 'prop-types'; 
import { MatchProvider } from "../../contexts/MatchProvider";
import { MerryLimitProvider } from "../../contexts/MerryLimitProvider";

// MatchProvider have dependencies on MerryLimitProvider, it must be the child of MerryLimitProvider
const MatchingAndMerryWrapper = ({ children }) => {
  return (
    <MerryLimitProvider>
      <MatchProvider>
          {children}
      </MatchProvider>
    </MerryLimitProvider>
  );
};

MatchingAndMerryWrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default MatchingAndMerryWrapper;
