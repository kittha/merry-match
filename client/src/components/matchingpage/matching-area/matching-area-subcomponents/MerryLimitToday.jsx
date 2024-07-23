const MerryLimitToday = ({ merryLimit }) => {
  return (
    <div className="lg:fixed lg:bottom-4 lg:right-4">
      <p className="">
        Merry limit today <span>{merryLimit}</span>
      </p>
    </div>
  );
};

export default MerryLimitToday;
