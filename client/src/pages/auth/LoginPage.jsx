import bannerLogin from "../../../public/assets/loginpage/bannerLogin.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, state } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: username, password });
  };
  const navigate = useNavigate();
  return (
    <div className="lg:bg-[url('/src/assets/loginpage/login-bg.svg')] bg-cover w-screen h-auto min-h-screen flex justify-center m-0 p-0 pt-[52px] lg:pt-[88px]">
      <div className="lg:mt-[80px] lg:mb-[179px] w-full  flex flex-col lg:flex-row lg:justify-center justify-start mt-[40px] items-center gap-[40px] lg:gap-[216px] px-[16px]">
        <section className="left w-full lg:w-[450px] h-auto lg:h-[677px] flex justify-center lg:justify-start">
          <img
            src={bannerLogin}
            alt="banner"
            className="w-full lg:w-[450px] h-auto px-[99px] lg:p-0 "
          />
        </section>
        <form
          onSubmit={handleSubmit}
          className="right flex flex-col w-full lg:w-auto h-auto lg:h-[534px] justify-center font-Nunito"
        >
          <p className="text-[#7B4429] font-[600] text-[14px] leading-[21px]">
            LOGIN
          </p>
          <h1 className="text-[32px] lg:text-[46px] text-[#A62D82] leading-[40px] lg:leading-[57.5px] font-[800] mt-[16px] lg:mt-0">
            Welcome back to <br className="hidden lg:block" /> Merry Match
          </h1>
          <label className="mt-[24px] lg:mt-[37px] font-[400] text-[16px] leading-[24px]">
            Username or Email
          </label>
          <input
            className="w-full lg:w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px] "
            type="text"
            placeholder="Enter Username or Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className="mt-[24px] lg:mt-[40px] font-[400] text-[16px] leading-[24px]">
            Password
          </label>
          <input
            className="w-full lg:w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px] "
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-full lg:w-[450px] h-[48px] bg-[#C70039] px-[24px] py-[12px] mt-[24px] lg:mt-[40px] rounded-[99px] text-[16px] font-[700] leading-[24px] text-white text-center"
            type="submit"
          >
            Log in
          </button>
          <div className="flex gap-[4px] mt-[24px] lg:mt-[40px]  lg:justify-start">
            <p className="text-black font-[400] text-[16px] leading-[24px]">
              Don't have an account?
            </p>
            <button
              className="text-[#C70039] font-[700] text-[16px] leading-[24px]"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
