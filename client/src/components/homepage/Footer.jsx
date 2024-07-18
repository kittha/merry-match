import merryMatchLogo from "/assets/footer-image/logo1.png";
import facebookLogo from "/assets/footer-image/logo2.png";
import instagramLogo from "/assets/footer-image/logo3.png";
import xLogo from "/assets/footer-image/logo4.png";

function Footer() {
  return (
    <footer className="bg-[#F6F7FC] w-full h-full font-Nunito">
      <div className="w-[340px] h-[345px] lg:w-[1120px] lg:h-[371px] bg-[#F6F7FC] mx-auto">
        <div className=" ld:w-[1120px] flex flex-col justify-space-between gab-[48px] relative top-[48px]">
          <div className="lg:w-[1120px] lg:h-[110px] w-[327px] h-[120px] mx-auto">
            <img
              src={merryMatchLogo}
              className="w-[238.57px] h-[80px] p-[22.5px 8.7px 20px 7.46px] mx-auto"
              alt="logo1"
            />
            <p className=" lg:h-[30px] w-auto h-[60px] font-nunito font-semibold text-lg leading-7 text-center text-[#646D89]">
              New generation of online dating website for everyone
            </p>
          </div>

          <div className="lg:w-[1120px] h-[117px] w-[327px] flex flex-col gap-[24px] pt-[24px] mx-auto">
            <div className="flex flex-col gap-[24px] pt-[2px] border-b-[1px] border-[#E4E6ED]"></div>
            <p className="lg:w-auto w-[343px] h-[32px] font-nunito font-medium text-sm leading-[21px] text-[#9AA1B9] text-center mx-auto">
              copyright ©2022 merrymatch.com All rights reserved
            </p>

            <div className="w-[176px] h-[48px] flex flex-row gap-[16px] mx-auto">
              <a href="https://www.facebook.com/">
                <Logo image={facebookLogo} alt="facebook-logo" />
              </a>
              <a href="https://www.instagram.com/accounts/login/?hl=en">
                <Logo image={instagramLogo} alt="instagram-logo" />
              </a>
              <a href="https://x.com/">
                <Logo image={xLogo} alt="x-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo(props) {
  return (
    <div className="w-[48px] h-[48px] rounded-[24px] p-[12px] flex gap-[10px] bg-[#A62D82] ">
      <div className="w-[24px] h-[24px]">
        <img
          src={props.image}
          className="w-[15.28px] h-[15.19px] relative top-[4.36px] left-[4.36px]"
          alt={props.alt}
        />
      </div>
    </div>
  );
}

export default Footer;
