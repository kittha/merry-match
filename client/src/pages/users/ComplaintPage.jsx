import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import NavbarAuthen from "../../components/navbar/NavbarAuthen";

function ComplaintPage() {
  const [issue, setIssue] = useState("");
  console.log(issue);
  const [description, setDescription] = useState("");
  console.log(description);
  const { userId } = useParams();
  //console.log(userId);
  const postComplaintPage = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/complaints/${userId}`,
        {
          issue: issue,
          description: description,
        }
      );
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComplaintPage();
  };

  return (
    <div className="font-Nunito">
      <div className="w-[548px] h-[653px] flex flex-col gap-[80px]">
        <header className="lg:w-[548px] h-[145px] flex flex-col gap-[16px]">
          <p className="text-[#7B4429] font-semibold text-base leading-6 w-[548px] h-[21px]">
            COMPLAINT
          </p>

          <h2 className="text-[#A62D82] text-[46px] leading-[57.5px] font-extrabold text-left lg:w-[548px] w-auto lg:h-[116px] h-auto">
            If you have any trouble <br /> Don't be afraid to tell us!
          </h2>
        </header>
        <div className="w-[548px] h-[428px] flex flex-col gap-[40px]">
          <form onSubmit={handleSubmit}>
            <div className="w-[548px] h-[76px] flex flex-col gap-[4px]">
              <label
                htmlFor="issue"
                className="w-[548px] h-[24px] flex flex-col gap-[4px]"
              >
                Issue
              </label>
              <input
                id="issue"
                type="text"
                placeholder="Place Holder"
                className="w-[548px] h-[48px] rounded-[8px] border-[1px] border-[#D6D9E4] bg-[#FFFFFF] pt-[12px] pr-[16px] pb-[12px] pl-[12px] flex gap-8"
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
              />
            </div>
            <div className="w-[548px] h-[224px] flex flex-col gap-[4px]">
              <label
                htmlFor="description"
                className="w-[446px] h-[24px] flex flex-col gap-[4px]"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Place Holder"
                className="w-[548px] h-[196px] rounded-[8px] border-[1px] border-[#D6D9E4] bg-[#FFFFFF] pt-[12px] pr-[16px] pb-[12px] pl-[12px] flex gap-[8px]"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-[102px] h-[48px] rounded-full pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-[#C70039] text-[#FFFFFF] font-bold text-base leading-6 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintPage;
