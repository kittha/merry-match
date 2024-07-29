function MainContent({ complaintData }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    hours = hours % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${month}/${day}/${year} `;

    return formattedDate;
  };
  return (
    <div className="w-[1200px] min-h-[944px] bg-[#F6F7FC] flex justify-center font-Nunito">
      <div className="w-[1080px] h-[500px] bg-[#FFFFFF] mt-10 rounded-2xl flex flex-col justify-center items-center gap-[40px]">
        <div className="w-[880px] h-[30px] flex items-center gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Complaint by:</p>
          <p>{complaintData.username}</p>
        </div>
        <hr className="w-[880px]" />
        <div className="w-[880px] h-fit] flex flex-col gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Issue</p>
          <p>{complaintData.issue}</p>
        </div>
        <div className="w-[880px] h-fit flex flex-col gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Description</p>
          <p>{complaintData.description}</p>
        </div>
        <div className="w-[880px] h-fit flex flex-col gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Date Submitted</p>
          <p>{formatDate(complaintData.created_at)}</p>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
