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
              <div className="card w-[357px] h-full border rounded-[32px] p-10 flex flex-col gap-6">
                <img
                  src="#"
                  alt="icon-package"
                  className="icon w-[60px] h-[60px] bg-gray-500"
                />
                <div className="top w-full h-[78px] bg-pink-300">
                  <h3>Basic</h3>
                  <p>THB</p>
                </div>
                <div className="detail w-full h-[100px] bg-pink-400"></div>
                <hr />
                <button className="choose-package bg-[#FFE1EA] rounded-full px-6 py-3">
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
