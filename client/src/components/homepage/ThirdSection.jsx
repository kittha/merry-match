export function ThirdSection() {
  return (
    <section className="bg-[#160404] w-screen h-[570px] m-0 p-0">
      <div className="bg-[#160404] w-[375px] h-[570px] lg:w-[1440px] mx-auto">
        <div className="bg-gradient-to-r from-[#820025] to-[#A95BCD] lg:w-[1120px] w-[375px] h-[564px] lg:h-[369px] lg:rounded-[32px] relative lg:top-[80px] lg:left-[160px]">
          <h2 className="w-[343px] h-[232px] lg:w-[588px] lg:h-[116px] relative top-[128px] left-[16px] lg:top-[83px] lg:left-[266px] font-nunito font-extrabold text-[46px] leading-[57.5px] text-center text-[#FFFFFF]">
            Let’s start finding and matching someone new
          </h2>
          <button className="w-[163px] h-[48px] rounded-full p-[12px] [24px] bg-[#FFE1EA] text-[#95002B] text-[16px] leading-[24px] text-center font-nunito font-bold relative lg:top-[120px] lg:left-[479px] top-[170px] left-[106px]">
            <a href="#">Start Matching!</a>
          </button>
          <div className="w-[436.19px] h-[532.68px] lg:w-[1165.19px] lg:h-[308.68px] relative top-[34.07px] left-[-30.44px]">
            <img
              src="./src/assets/section3-img/icon1.png"
              className="w-[130px] h-[140.51px] relative lg:top-[-130px] lg:left-[30px] top-[-260px] left-[30px]"
              alt="icon1"
            />
            <img
              src="./src/assets/section3-img/icon2.png"
              className="w-[24.88px] h-[22.94px] relative lg:top-[-140px] lg:left-[1060px] top-[10px] left-[299px]"
              alt="icon2"
            />
            <img
              src="./src/assets/section3-img/icon3.png"
              className="w-[70px] h-[71px] relative lg:top-[-90px] lg:left-[1080px] top-[10px] left-[336px]"
              alt="icon3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ThirdSection;
