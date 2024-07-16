import icon from "../../../public/assets/package/correct-icon.svg";
import Footer from "../../components/homepage/Footer";

const MerryPackage = () => {
  const arr = [1, 2, 3];
  return (
    <div className="page-container h-screen w-screen flex flex-col items-center bg-[#FCFCFE]">
      <div className="content-container lg:h-[663px] lg:w-[1119px] h-auto flex flex-col items-center lg:items-end gap-[80px] mt-[168px] mb-[160px] font-Nunito">
        {/* <div className="lg:w-[931px] h-[145px] w-auto flex lg:flex-row flex-col lg:gap-[80px] gap-[20px]"></div> */}
        <header className="lg:w-full h-[145px] flex flex-col lg:mt-0 mt-[60px] lg:pl-0 pl-[20px]">
          <p className="text-[#7B4429] font-semibold text-sm h-[29px]">
            MERRY MEMBERSHIP
          </p>
          <h2 className="text-[#A62D82] text-[46px] leading-[57.5px] font-extrabold text-left w-auto lg:h-[116px] h-auto">
            Be part of Merry Membership
            <br />
            to make more Merry!
          </h2>
        </header>
        <main className="card-container lg:w-full lg:h-[438px] flex lg:flex-row gap-6">
          {arr.map((value) => {
            return (
              <div className="card w-[357px] h-full border border-[#D6D9E4] rounded-[32px] p-10 flex flex-col gap-6 bg-white">
                <img
                  src="#"
                  alt="icon-package"
                  className="icon w-[60px] h-[60px] bg-gray-500"
                />
                <div className="top w-full h-[78px] flex flex-col gap-2">
                  <h3 className="text-[#411032] text-[32px] leading-10 font-bold h-10">
                    Basic
                  </h3>
                  <div className="price-container flex h-[30px] gap-2 items-end">
                    <p className="text-xl text-[#2A2E3F] font-semibold">THB</p>
                    <p className="text-[#9AA1B9]">/Month</p>
                  </div>
                </div>
                <div className="detail-container w-full h-[100px] border-[#E4E6ED] border-b flex flex-col gap-4">
                  {arr.slice(0, 2).map(() => {
                    return (
                      <div className="detail flex gap-3">
                        <img
                          src={icon}
                          width="15.28"
                          height="15.28"
                          alt="correct-icon"
                          className="icon w-6 h-6 object-none"
                        />
                        <p className="text-[#424C6B]">Details</p>
                      </div>
                    );
                  })}
                </div>
                <button className="choose-package bg-[#FFE1EA] rounded-full px-6 py-3 text-[#95002B] font-bold shadow-[2px_2px_12px_0px_rgba(64,50,133,0.08)]">
                  Choose Package
                </button>
              </div>
            );
          })}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MerryPackage;
