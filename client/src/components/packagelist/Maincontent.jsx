function MainContent() {
  return (
    <div className="w-[1200px] h-[944px] bg-[#F6F7FC] flex flex-col items-center font-Nunito">
      <div className="w-[1080px] h-[41px] flex bg-[#D6D9E4] mt-[48px] rounded-t-2xl font-medium text-sm text-[#424C6B]">
        <div className="w-[80px] h-[41px] flex items-center ml-[104px]">
          <p className="ml-[16px]">Icon</p>
        </div>
        <div className="w-[180px] h-[41px] flex items-center">
          <p className="ml-[16px]">Package name</p>
        </div>
        <div className="w-[180px] h-[41px] flex items-center">
          <p className="ml-[16px]">Merry limit</p>
        </div>
        <div className="w-[200px] h-[41px] flex items-center">
          <p className="ml-[16px]">Created date</p>
        </div>
        <div className="w-[317px] h-[41px] flex items-center">
          <p className="ml-[16px]">Updated date</p>
        </div>
      </div>
    </div>
  );
}
export default MainContent;
