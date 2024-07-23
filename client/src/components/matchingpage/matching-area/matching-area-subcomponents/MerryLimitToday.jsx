const MerryLimitToday = ({ merryLimit }) => {
  return (
    <div className="z-0 fixed bottom-4 right-4 lg:bottom-4 lg:right-[50%]">
      <p className="">
        Merry limit today <span>{merryLimit}</span>
      </p>
    </div>
  );
};

export default MerryLimitToday;
