const MerryLimitToday = ({ merryLimit }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <p className="">
        Merry limit today <span>{merryLimit}</span>
      </p>
    </div>
  );
};

export default MerryLimitToday;
