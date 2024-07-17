import { useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
//import NavbarAuthen from "../../components/navbar/NavbarAuthen";

function ComplaintPage() {
  const [issue, setIssue] = useState("");
  console.log(issue);
  const [description, setDescription] = useState("");
  console.log(description);
  //const { userId } = useParams();
  //console.log(userId);
  const postComplaintPage = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/complaints/2`,
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
        <div className="w-[548px] h-[428px] flex flex-col gap-[40px] mt-[100px]">
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
                className=""
                value={issue}
                onChange={(event) => setIssue(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Place Holder"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintPage;
