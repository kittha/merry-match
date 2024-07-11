import bannerLogin from "/src/assets/loginpage/bannerLogin.png";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/src/assets/loginpage/register-section-bg.svg')] bg-cover w-[1440px] h-[936px] flex justify-center m-0 p-0">
      <div className="mt-[80px] mb-[179px] w-[1119px] h-[677px] flex flex-row justify-center items-center gap-[216px]">
        <section className="left w-[450px] h-[677px]">
          <img src={bannerLogin} alt="banner" />
        </section>
        <section className="right flex flex-col w-[453px] h-[534px] justify-center font-Nunito">
          <p className="text-[#7B4429] font-[600] text-[14px] leading-[21px]">
            LOGIN
          </p>
          <h1 className="text-[46px] text-[#A62D82] leading-[57.5px] font-[800] ">
            Welcome back to <br /> Merry Match
          </h1>
          <label className="mt-[37px] font-[400] text-[16px] leading-[24px]">
            Username or Email
          </label>
          <input
            className="w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px] "
            type="text"
            placeholder="Enter Username or Email"
            onChange={(e) => {}}
          />
          <label className="mt-[40px] font-[400] text-[16px] leading-[24px]">
            Password
          </label>
          <input
            className="w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px] "
            type="text"
            placeholder="Enter Password"
            onChange={(e) => {}}
          />
          <button className="w-[453px] h-[48px] bg-[#C70039] px-[24px] py-[12px] mt-[40px] rounded-[99px] text-[16px] font-[700] leading-[24px] text-white text-center">
            Log in
          </button>
          <div className="flex gap-[4px] mt-[40px]">
            <p className="text-black font-[400] text-[16px] leading-[24px]">
              Don't have an account?
            </p>
            <button className="text-[#C70039] font-[700] text-[16px] leading-[24px]"
              onClick={() => { navigate("/register");}}
            >
              Register
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
export default LoginPage;
