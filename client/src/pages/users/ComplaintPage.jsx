import { useState } from "react";
import axios from "axios";
import image from "/assets/complaint-image/image.png";
import Footer from "../../components/homepage/Footer";
import useAuth from "../../hooks/useAuth";

function ComplaintPage() {
  const { state } = useAuth();
  const userId = state && state.user ? state.user.id : null;
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  const postComplaintPage = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/complaints/`,
        {
          issue: issue,
          description: description,
          userId: userId,
        }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComplaintPage();
  };

  return (
    <div className="font-Nunito lg:w-full lg:h-full">
      <div className="w-[375px] h-[950px] flex flex-col gap-[40px] bg-[#FCFCFE] pt-[90px] lg:w-full lg:h-[1023px] min-[320px]:w-auto lg:gap-[80px] lg:pt-[160px]">
        <div className="w-[343px] h-[532px] flex flex-col gap-[35px] mx-auto lg:w-[1119px] lg:h-[677px] lg:flex-row-reverse lg:gap-[121px]">
          <img
            src={image}
            alt="image"
            className="w-[177px] h-[266px] mx-auto lg:w-[450px] lg:h-[677px]"
          />
          <div className="flex flex-col gap-[40px] lg:w-[548px] lg:h-[653px] lg:gap-[80px]">
            <header className="w-[343px] h-[149px] flex flex-col gap-[8px] lg:w-[548px] lg:h-[145px]">
              <p className="w-[343px] h-[21px] lg:w-[548px] text-sm leading-6 text-[#7B4429] font-semibold">
                COMPLAINT
              </p>
              <h2 className="w-[343px] h-[120px] text-[32px] leading-[40px] text-[#A62D82] text-left font-bold  lg:w-[548px] lg:h-[116px] lg:text-[46px] lg:leading-[57.5px] lg:font-extrabold">
                If you have any trouble <br /> Don't be afraid to tell us!
              </h2>
            </header>

            <form
              onSubmit={handleSubmit}
              className="w-[343px] h-[346px] flex flex-col gap-[35px] text-base leading-6 text-[#07090D] font-normal lg:w-[548px] lg:h-[428px] lg:gap-[40px]"
            >
              <div className="w-[343px] h-[76px] flex flex-col gap-[4px] lg:w-[548px]">
                <label
                  htmlFor="issue"
                  className="w-[343px] h-[24px] flex flex-col gap-[4px] lg:w-[548px]"
                >
                  Issue
                </label>
                <input
                  id="issue"
                  type="text"
                  placeholder="Place Holder"
                  className="w-[343px] h-[48px] rounded-[8px] border-[1px] border-[#D6D9E4] bg-[#FFFFFF] pt-[12px] pr-[16px] pb-[12px] pl-[12px] flex gap-8 lg:w-[548px]"
                  value={issue}
                  onChange={(event) => setIssue(event.target.value)}
                />
              </div>
              <div className="w-[343px] h-[142px] flex flex-col gap-[4px] lg:w-[548px] lg:h-[224px]">
                <label
                  htmlFor="description"
                  className="w-[343px] h-[24px] flex flex-col gap-[4px] lg:w-[446px]"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Place Holder"
                  className="w-[343px] h-[114px] rounded-[8px] border-[1px] border-[#D6D9E4] bg-[#FFFFFF] pt-[12px] pr-[16px] pb-[12px] pl-[12px] flex flex-col gap-[8px] resize-none lg:w-[548px] lg:h-[196px]"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-[343px] h-[48px] rounded-full pt-[12px] pr-[24px] pb-[12px] pl-[24px] bg-[#C70039] text-[#FFFFFF] font-bold text-base leading-6 text-center lg:w-[102px] lg:h-[48px]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ComplaintPage;
