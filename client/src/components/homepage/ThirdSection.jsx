export function ThirdSection() {
  return (
    <section className="bg-[#160404] w-full h-[564px]">
      <div className="bg-[#160404] lg:h-[570px] h-[564px] lg:w-[1440px] mx-auto">
        <div className="bg-gradient-to-r from-[#820025] to-[#A95BCD] lg:w-[1120px] min-[320px]:w-auto w-[375px] h-[564px] lg:h-[369px] lg:rounded-[32px] relative lg:top-[80px] lg:left-[160px] flex flex-col justify-center">
          <h2 className="w-[343px] h-[232px] sm:w-[588px] lg:h-[116px] relative top-[128px] lg:top-[83px] lg:left-[266px] sm:top-[170px] sm:left-[20px] font-nunito font-extrabold text-[46px] leading-[57.5px] text-center text-[#FFFFFF] lg:mx-0 mx-auto">
            Let’s start finding and matching someone new
          </h2>
          <button className="w-[163px] h-[48px] rounded-full p-[12px] [24px] bg-[#FFE1EA] text-[#95002B] text-[16px] leading-[24px] text-center font-nunito font-bold relative lg:top-[120px] lg:left-[20px] top-[170px] mx-auto sm:top-[180px] sm:left-[20px]">
            <a href="#">Start Matching!</a>
          </button>

          <div className="w-auto h-[532.68px] lg:w-[1165.19px] lg:h-[308.68px] relative lg:top-[-135px] lg:left-[-30px] top-[-265px] mx-auto">
            <img
              src="./src/assets/section3-img/icon1.png"
              className="relative lg:top-[73.23px] lg:left-[50.44px] sm:top-[95px] sm:left-[-300px] top-[60px] left-[-150px] animate-pulse"
              alt="icon1"
            />
            <img
              src="./src/assets/section3-img/icon2.png"
              className="relative lg:top-[40px] lg:left-[1020px] sm:top-[320px] sm:left-[350px] top-[270px] left-[200px] animate-bounce"
              alt="icon2"
            />
            <img
              src="./src/assets/section3-img/icon3.png"
              className="relative lg:top-[60px] lg:left-[1050px] sm:top-[340px] sm:left-[350px] top-[290px] left-[170px] animate-pulse"
              alt="icon3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ThirdSection;
