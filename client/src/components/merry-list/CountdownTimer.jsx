import React, { useState, useEffect } from "react";
import { differenceInHours, endOfDay } from "date-fns";

const CountdownTimer = () => {
  const [hoursLeft, setHoursLeft] = useState(calculateHoursLeft());

  function calculateHoursLeft() {
    const now = new Date();
    const midnight = endOfDay(now);
    const diff = differenceInHours(midnight, now);

    return diff > 0 ? diff : 0;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newHoursLeft = calculateHoursLeft();
      setHoursLeft(newHoursLeft);

      if (newHoursLeft <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <span>
        Reset in {hoursLeft}
        {hoursLeft === 1 ? "h" : "h"}...
      </span>
    </>
  );
};

export default CountdownTimer;
