import success from "../../../public/assets/paymentSuccesspage/success.svg";
// import icon from "../../../public/assets/paymentSuccesspage/icon.png";
import checkmark from "../../../public/assets/paymentSuccesspage/checkmark.svg";
import Footer from "../../components/homepage/Footer";
import { useNavigate } from "react-router-dom";
import { usePackage } from "../../hooks/usePackage";
import useAuth from "../../hooks/useAuth";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { selectedPackage } = usePackage();
  const { state } = useAuth();
  const userId = state.user?.id;
  const today = new Date();

  const startDate = today.toLocaleDateString("th-TH");

  const nextBillingDate = new Date(today);
  nextBillingDate.setMonth(today.getMonth() + 1);
  const nextBilling = nextBillingDate.toLocaleDateString("th-TH");

  return (
    <div className="lg:pt-[88px] font-Nunito">
      <div className="flex justify-center">
        <div className="px-[16px] py-[40px] mt-[40px] lg:mt-[88px] mb-[88px] lg:mb-[361px] w-screen lg:w-[1112px] flex flex-col lg:flex-row gap-[40px] lg:gap-[114px]">
          <div className="left flex flex-col gap-[8px] lg:gap-[40px]">
            <img src={success} className="w-[80px] h-[80px]"></img>
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px] text-[#7B4429] font-[600]">
                PAYMENT SUCCESS
              </p>
              <p className="max-lg:w-[300px] text-[32px] leading-[40px] lg:text-[46px] font-[800] lg:leading-[57.5px] text-[#A62D82]">
                Welcome Merry Membership!
                <br />
                Thank you for joining us
              </p>
            </div>
            <div className="mt-[40px] flex gap-[24px] max-lg:hidden">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="px-[24px] py-[12px] bg-[#FFE1EA] text-[#95002B] font-[700] text-center rounded-full"
              >
                Back to home
              </button>
              <button
                onClick={() => {
                  navigate(`/membership/${userId}`);
                }}
                className="px-[24px] py-[12px] bg-[#C70039] text-white font-[700] text-center rounded-full"
              >
                Check Membership
              </button>
            </div>
          </div>
          <div className="right">
            <div className="lg:w-[357px] p-[16px] lg:p-[40px] rounded-[32px] bg-gradient-to-r from-[#742138] to-[#A878BF] flex flex-col gap-[16px] lg:gap-[24px]">
              <div className="bg-[#F6F7FC] size-[60px] rounded-[16px] flex justify-center items-center">
                <img src={selectedPackage?.url} className="size-[36px]"></img>
              </div>
              <div className="top">
                <p className="text-white text-[32px] font-[700]">
                  {selectedPackage?.name || "N/A"}
                </p>
                <span className="text-[#F4EBF2] text-[20px] font-[600]">
                  THB {selectedPackage?.price || "N/A"}{" "}
                </span>
                <span className="text-[#F4EBF2] text-[16px] font-[400]">
                  /Month
                </span>
              </div>
              <div className="center text-[#F4EBF2] font-[400] text-[16px] leading-[24px] flex flex-col gap-[16px] border-b border-[#E4E6ED] pb-[36px]">
                {selectedPackage?.details.map((detail, index) => (
                  <div key={index} className="flex gap-[12px] items-center">
                    <img src={checkmark} className="w-[24px] h-[24px]"></img>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
              <div className="bottom ">
                <div className="flex justify-between py-[4px]">
                  <span className="text-[#EFC4E2] ">Start Membership</span>
                  <span className="text-white">{startDate}</span>
                </div>
                <div className="flex justify-between py-[4px]">
                  <span className="text-[#EFC4E2] ">Next billing</span>
                  <span className="text-white">{nextBilling}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[343px] h-[48px] flex justify-between gap-[16px] lg:hidden text-[16px]">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-[150px] h-[48px] px-[15px] py-[12px] bg-[#FFE1EA] text-[#95002B] font-[700] rounded-full"
            >
              Back to home
            </button>
            <button
              onClick={() => {
                navigate(`/membership/${userId}`);
              }}
              className="w-[177px] h-[48px] px-[15px] py-[12px] bg-[#C70039] text-white font-[700] rounded-full"
            >
              Check Membership
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentSuccessPage;
