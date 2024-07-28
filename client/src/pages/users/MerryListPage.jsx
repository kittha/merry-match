import React from "react";
import { useMerryLimit } from "../../contexts/MerryLimitProvider";

function MerryListPage() {
  const {
    availableClicksToday,
    setAvailableClicksToday,
    maxDailyQuota,
    setmaxDailyQuota,
  } = useMerryLimit;

  return (
    <>
      <div>PLACEHOLDER</div>
    </>
  );
}
export default MerryListPage;
