import icon1 from "../../assets-backup/section2-image/icon1.png";
import icon2 from "../../assets-backup/section2-image/icon2.png";
import icon3 from "../../assets-backup/section2-image/icon3.png";
import icon4 from "../../assets-backup/section2-image/icon4.png";

function SecondSection() {
  return (
    <section className="bg-[#160404] w-full h-full">
      <div
        id="second-section"
        className="lg:w-full lg:h-[622px] min-[320px]:w-auto w-[375px] h-auto bg-[#160404] pb-10 pt-10 mx-auto"
      >
        <div className="lg:w-[1120px] lg:h-[454px] w-[343px] h-[1444px] flex flex-col gap-[48px] pt-[80px] mx-auto">
          <h2 className="w-[343px] h-[58px] font-Nunito font-extrabold text-[46px] leading-[57.5px] text-center text-[#DF89C6] lg:w-[1120px] lg:h-[58px]">
            How to Merry
          </h2>
          <div className="flex lg:flex-row gap-[24px] justify-center items-center flex-col lg:mx-auto">
            <CardFeature
              image={icon1}
              title="Upload your cool picture"
              detail="Lorem ipsum is a placeholder text"
              alt="icon1"
            />
            <CardFeature
              image={icon2}
              title="Explore and find the one you like"
              detail="Lorem ipsum is a placeholder text"
              alt="icon2"
            />
            <CardFeature
              image={icon3}
              title="Click ‘Merry’ for get to know!"
              detail="Lorem ipsum is a placeholder text"
              alt="icon3"
            />
            <CardFeature
              image={icon4}
              title="Start chating and relationship "
              detail="Lorem ipsum is a placeholder text"
              alt="icon4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CardFeature(props) {
  return (
    <div className="cursor-pointer lg:w-[262px] w-[343px] lg:h-[348px] h-[294px] rounded-[40px] p-[32px] bg-[#2A0B21] flex flex-col gap-[40px] transition-transform duration-200 ease-out transform hover:translate-x-4 hover:translate-y-2">
      <div className="lg:w-[120px] lg:h-[120px] w-[110px] h-[120px]  rounded-full bg-[#411032] relative mx-auto">
        <img
          src={props.image}
          className="w-[50px] h-[50px] absolute lg:top-[35px] lg:left-[35px] top-[28px] left-[30px]"
          alt={props.alt}
        />
      </div>
      <div className="lg:w-[198px] lg:h-[124px] w-[279px] h-[100px] p-[2px] flex flex-col lg:gap-[12px]">
        <h4 className="lg:w-[194px] lg:h-[60px] w-[275px] h-[60px] font-Nunito font-bold text-2xl leading-[30px] text-center text-white">
          {props.title}
        </h4>
        <p className="lg:w-[194px] lg:h-[48px] w-[275px] h-[24px] font-Nunito font-normal text-base leading-6 text-center text-[#C8CCDB]">
          {props.detail}
        </p>
      </div>
    </div>
  );
}

export default SecondSection;
