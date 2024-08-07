function MainContent({ complaintData }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isPM = hours >= 12;
    hours = hours % 12 || 12; // Convert to 12-hour format

    const time = `${hours}:${minutes}${isPM ? "PM" : "AM"}`;

    const formattedDateWithTime = `${month}/${day}/${year} ${time}`;
    const formattedDateWithNoTime = `${month}/${day}/${year}`;

    return { formattedDateWithTime, formattedDateWithNoTime };
  };
  return (
    <div className="w-full min-h-[944px] py-10 bg-[#F6F7FC] flex justify-center font-Nunito">
      <div className="w-[1080px] h-fit bg-[#FFFFFF] py-10 rounded-2xl flex flex-col items-center gap-[40px]">
        <div className="w-[880px] h-[30px] flex items-center gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Complaint by:</p>
          <p>{complaintData.username}</p>
        </div>
        <hr className="w-[880px]" />
        <div className="w-[880px] flex flex-col gap-2">
          <p className="text-[#646D89] w-[880px] text-xl font-semibold">
            Issue
          </p>
          <p className="w-[880px] break-words">{complaintData.issue}</p>
        </div>
        <div className="w-[880px] flex flex-col gap-2">
          <p className="text-[#646D89] w-[880px] text-xl font-semibold">
            Description
          </p>
          <p className="w-[880px] break-words">{complaintData.description}</p>
        </div>
        <div className="w-[880px] flex flex-col gap-2">
          <p className="text-[#646D89] text-xl font-semibold">Date Submitted</p>
          <p className="w-[880px]">
            {formatDate(complaintData.created_at).formattedDateWithNoTime}
          </p>
        </div>
        {complaintData.status === "Resolved" ? (
          <>
            <hr className="w-[880px]" />
            <div className="w-[880px] flex flex-col gap-2">
              <p className="text-[#646D89] text-xl font-semibold">
                Resolved date
              </p>
              <p className="w-[880px]">
                {formatDate(complaintData.updated_at).formattedDateWithTime}
              </p>
            </div>
          </>
        ) : null}
        {complaintData.status === "Cancel" ? (
          <>
            <hr className="w-[880px]" />
            <div className="w-[880px] flex flex-col gap-2">
              <p className="text-[#646D89] text-xl font-semibold">
                Canceled date
              </p>
              <p className="w-[880px]">
                {formatDate(complaintData.updated_at).formattedDateWithTime}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default MainContent;
