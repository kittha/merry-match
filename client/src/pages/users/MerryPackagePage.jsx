import icon from "../../../public/assets/package/correct-icon.svg";
import Footer from "../../components/homepage/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePackage } from "../../contexts/PackageProvider";

const MerryPackage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const { setSelectedPackage } = usePackage();

  const getAllPackage = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/packages`
      );
      const topThreePackage = result.data.data.slice(0, 3);
      setPackages(topThreePackage);
    } catch (error) {
      console.error("Error in Merry Package Page: ", error);
    }
  };

  useEffect(() => {
    getAllPackage();
  }, []);

  return (
    <div className="page-container h-screen w-screen flex flex-col items-center bg-[#FCFCFE]">
      <div className="content-container lg:h-[663px] lg:w-[1119px] h-auto flex flex-col items-center lg:gap-[80px] gap-[43px] mt-[52px] lg:mt-[168px] lg:mb-[160px] lg:p-0 py-10 font-Nunito">
        <header className="lg:w-full w-[343px] lg:h-[145px] flex flex-col gap-2">
          <p className="text-[#7B4429] font-semibold text-sm lg:h-[29px]">
            MERRY MEMBERSHIP
          </p>
          <h2 className="text-[#A62D82] text-3xl lg:text-[46px] lg:leading-[57.5px] font-bold lg:font-extrabold text-left w-auto lg:h-[116px] h-auto max-lg:hidden">
            Be part of Merry Membership
            <br />
            to make more Merry!
          </h2>
          <h2 className="text-[#A62D82] text-[36px] leading-[40px] font-[700] text-left w-auto lg:h-[116px] h-auto lg:hidden">
            Join us and start matching
          </h2>
        </header>
        <main className="card-container lg:w-full lg:h-[438px] flex flex-col lg:flex-row gap-6">
          {packages.map((pack) => (
            <div
              key={pack.package_id}
              className="card lg:w-[357px] w-[343px] h-full border border-[#D6D9E4] rounded-[32px] p-4 lg:p-10 flex flex-col gap-4 lg:gap-6 bg-white"
            >
              <div className="size-[60px] flex items-center justify-center rounded-[16px] bg-[#F6F7FC]">
                <img
                  src={pack.url}
                  alt="icon-package"
                  className="icon size-[36px] rounded-2xl"
                />
              </div>
              <div className="top w-full h-[78px] flex flex-col gap-2">
                <h3 className="text-[#411032] text-[32px] leading-10 font-bold h-10">
                  {pack.name}
                </h3>
                <div className="price-container flex h-[30px] gap-2 items-end">
                  <p className="text-xl text-[#2A2E3F] font-semibold">
                    THB {pack.price}
                  </p>
                  <p className="text-[#9AA1B9]">/Month</p>
                </div>
              </div>
              <div className="detail-container w-full h-[100px] border-[#E4E6ED] border-b flex flex-col gap-[12px] lg:gap-4 pb-[24px] lg:pd-[36px]">
                {pack.details.map((detail, index) => (
                  <div key={index} className="detail flex gap-3">
                    <img
                      src={icon}
                      width="15.28"
                      height="15.28"
                      alt="correct-icon"
                      className="icon w-6 h-6 object-none"
                    />
                    <p className="text-[#424C6B]">{detail}</p>
                  </div>
                ))}
              </div>
              <button
                className="choose-package bg-[#FFE1EA] rounded-full px-6 py-3 text-[#95002B] font-bold shadow-[2px_2px_12px_0px_rgba(64,50,133,0.08)]"
                onClick={() => {
                  setSelectedPackage(pack);
                  navigate("/payment");
                }}
              >
                Choose Package
              </button>
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MerryPackage;
