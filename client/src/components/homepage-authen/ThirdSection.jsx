import icon1 from "/assets/section3-image/icon1.png";
import icon2 from "/assets/section3-image/icon2.png";
import icon3 from "/assets/section3-image/icon3.png";
import { useNavigate } from "react-router-dom";

export function ThirdSection() {
  const navigate = useNavigate();

  // TODO check what is setIdOpen?
  return (
    <section className="bg-[#160404] w-full h-[564px] font-Nunito">
      <div className="bg-[#160404] lg:h-[570px] h-[564px] lg:w-full flex flex-col m-0 mx-auto">
        <div className="bg-gradient-to-r from-[#742138] to-[#A878BF] lg:w-[1120px] min-[320px]:w-full w-[375px] h-[564px] lg:h-[369px] lg:rounded-[32px] relative lg:top-[80px] lg:left-[0px] flex flex-col justify-center mx-auto lg:pt-10">
          <h2 className="w-[343px] h-[232px] sm:w-[610px] lg:h-[116px] relative top-[128px] lg:top-[83px] lg:left-[266px] sm:top-[170px] sm:left-[20px] font-Nunito font-extrabold text-[46px] leading-[57.5px] text-center text-[#FFFFFF] lg:mx-0 mx-auto">
            Let’s start finding <br /> and matching someone new
          </h2>
          <button
            className="z-10 w-[163px] h-[48px] rounded-full p-[12px] [24px] bg-[#FFE1EA] text-[#95002B] text-[16px] leading-[24px] text-center font font-bold relative lg:top-[120px] lg:left-[0px] top-[170px] mx-auto sm:top-[180px] sm:left-[20px] lg:hover:scale-105 lg:hover:bg-pink-300 lg:duration-300"
            onClick={() => {
              navigate("/matching");
              setIsOpen(false);
            }}
          >
            Start Matching!
          </button>

          <div className="w-auto h-[532.68px] lg:w-[1165.19px] lg:h-[308.68px] relative lg:top-[-135px] lg:left-[-30px] top-[-265px] mx-auto">
            <img
              src={icon1}
              className="relative lg:top-[53.23px] lg:left-[50.44px] sm:top-[95px] sm:left-[-300px] top-[60px] left-[-150px] animate-pulse"
              alt="icon1"
            />
            <img
              src={icon2}
              className="relative lg:top-[30px] lg:left-[1020px] sm:top-[320px] sm:left-[350px] top-[270px] left-[200px] animate-bounce"
              alt="icon2"
            />
            <img
              src={icon3}
              className="relative lg:top-[50px] lg:left-[1050px] sm:top-[340px] sm:left-[350px] top-[290px] left-[170px] animate-pulse"
              alt="icon3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ThirdSection;
