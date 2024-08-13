import bannerLogin from "/assets/loginpage/bannerLogin.png";
import EyeIconOpen from "/assets/loginpage/EyeIconOpen.png";
import EyeIconClosed from "/assets/loginpage/EyeIconClosed.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      await login({ email: email, password });
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:pt-[168px] pt-[93px] pb-[31px] lg:pb-[179px] bg-[#FCFCFE]">
      <div className="lg:bg-[url('/assets/loginpage/login-bg.svg')] bg-cover w-screen flex justify-center m-0 p-0">
        <div className=" w-full flex flex-col lg:flex-row lg:justify-center justify-start gap-[40px] lg:gap-[216px] max-lg:px-[16px]">
          <section className="left flex items-center justify-center">
            <img
              src={bannerLogin}
              alt="banner"
              className="max-lg:w-[177px] max-lg:h-[266px] lg:p-0"
            />
          </section>
          <form
            onSubmit={handleSubmit}
            className="right flex flex-col w-full lg:w-auto h-auto justify-center font-Nunito lg:py-[71.5px]"
          >
            <p className="text-[#7B4429] font-[600] text-[14px] leading-[21px]">
              LOGIN
            </p>
            <h1 className="text-[32px] lg:text-[46px] text-[#A62D82] leading-[40px] lg:leading-[57.5px] font-[700] lg:font-[800] mt-[8px] lg:mt-0">
              Welcome back to <br className="hidden lg:block" /> Merry Match
            </h1>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col mt-[37px]">
                <label className=" font-[400] text-[16px] leading-[24px]">
                  Email
                </label>
                <input
                  className="w-full lg:w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px]"
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-[14px] mt-[4px]">
                    {emailError}
                  </p>
                )}
              </div>
              <div className="relative flex flex-col">
                <label className=" font-[400] text-[16px] leading-[24px]">
                  Password
                </label>
                <input
                  className="w-full lg:w-[453px] h-[48px] border-[#D6D9E4] border mt-[4px] rounded-lg px-[12px] py-[16px]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <img
                  src={showPassword ? EyeIconOpen : EyeIconClosed}
                  alt="Toggle visibility"
                  className="h-[24px] w-[24px] absolute top-[52px] right-4 transform -translate-y-1/2 cursor-pointer opacity-50"
                  onClick={togglePasswordVisibility}
                />
                {passwordError && (
                  <p className="text-red-500 text-[14px] mt-[4px]">
                    {passwordError}
                  </p>
                )}
              </div>
              <button
                className="w-full lg:w-[450px] h-[48px] bg-[#C70039] px-[24px] py-[12px] rounded-[99px] text-[16px] font-[700] leading-[24px] text-white text-center drop-shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              <div className="flex gap-[4px] lg:justify-start">
                <p className="text-black font-[400] text-[16px] leading-[24px]">
                  Don&apos;t have an account?
                </p>
                <button
                  className="text-[#C70039] font-[700] text-[16px] leading-[24px]"
                  onClick={() => navigate("/register")}
                  disabled={loading}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
