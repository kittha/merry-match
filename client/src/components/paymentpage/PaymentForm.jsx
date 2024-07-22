import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MasterCard from "../../../public/assets/paymentpage/MasterCard.png";
import Visa from "../../../public/assets/paymentpage/Visa.png";
import "../../App.css";
import Frame from "../../../public/assets/paymentpage/Frame.png";
import Bullet from "../../../public/assets/paymentpage/Bullet.png";
import Footer from "../../components/homepage/Footer";
import { usePackage } from "../../contexts/PackageProvider";
import { useAuth } from "../../contexts/authentication";
const PaymentForm = () => {
  const navigate = useNavigate();
  const { selectedPackage } = usePackage();
  const { state } = useAuth();
  const [cardNumber, setCardNumber] = useState("");
  const [expCard, setExpCard] = useState("");
  const [cvcCard, setCVCCard] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [textAlert, setTextAlert] = useState("");

  const package_id = selectedPackage?.package_id;
  const package_name = selectedPackage?.name;
  const package_price = selectedPackage?.price;
  const userEmail = state.email;

  const handleConfirm = async (event) => {
    event.preventDefault();

    if (!cardNumber || !expCard || !cvcCard || !nameCard) {
      setTextAlert("All fields are required.");
      return;
    }

    const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const paymentData = {
      user: {
        name: nameCard,
        email: userEmail,
      },
      product: {
        package_id: package_id,
      },
      cardDetail: {
        id: "pm_card_visa",
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/checkout`,
        paymentData
      );

      if (!data.client_secret) {
        throw new Error("Missing client_secret from backend response.");
      }

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: {
            number: cardNumber.replace(/\s+/g, ""),
            exp_month: expCard.split("/")[0],
            exp_year: expCard.split("/")[1],
            cvc: cvcCard,
          },
          billing_details: {
            name: nameCard,
          },
        },
      });

      if (result.error) {
        setTextAlert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        navigate("/payment-success", {
          state: {
            packageId: package_id,
            packageName: package_name,
          },
        });
      }
    } catch (error) {
      setTextAlert(`Payment failed: ${error.message}`);
    }
  };

  const handleCardNumber = (event) => {
    let numberInput = event.target.value.replace(/\D/g, "");
    if (numberInput.length <= 16) {
      setCardNumber(numberInput.replace(/(\d{4})/g, "$1 ").trim());
    }
  };

  const handleExpCard = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length <= 4) {
      setExpCard(input.replace(/(\d{2})/, "$1/"));
    }
  };

  const handleCVCCard = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length <= 3) {
      setCVCCard(input);
    }
  };

  const handleNameCard = (event) => {
    setNameCard(event.target.value);
  };

  return (
    <div className="full">
      <div className="flex justify-center font-Nunito lg:mb-[269px]">
        <div className="flex flex-col lg:flex-row pt-[52px] lg:mt-[80px] lg:pt-[88px] gap-[22px] lg:w-[928px] justify-between">
          <div className="left w-screen lg:w-[358px] pt-[32px] pb-[16px] px-[24px] lg:py-[32px] lg:px-[24px] bg-[#F6F7FC] lg:h-[318px] lg:rounded-[24px] border-b lg:border border-[#D6D9E4]">
            <header className="flex items-center">
              <img
                src={Frame}
                className="w-[24px] h-[24px] mr-[12px]"
                alt="Frame"
              />
              <p className="text-[#646D89] font-[600] text-[20px]">
                Merry Membership
              </p>
            </header>
            <div className="container mt-[16px] lg:mt-[24px]">
              <div className="top flex justify-between py-[10px]">
                <p className="text-[#646D89] text-[16px] font-[400]">Package</p>
                <p className="text-[#2A2E3F] text-[20px] font-[600]">
                  {selectedPackage?.name || "N/A"}
                </p>
              </div>
              <div className="center py-[10px] px-[8px] bg-white rounded-[8px] text-[#424C6B] font-[400] text-[16px] leading-[24px] flex flex-col gap-[8px]">
                {selectedPackage?.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex gap-[10px] items-center pl-[8px]"
                  >
                    <img
                      src={Bullet}
                      className="w-[4px] h-[4px]"
                      alt="Bullet"
                    />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
              <div className="bottom flex justify-between py-[24px]">
                <p className="text-[#646D89] font-[400] text-[16px]">
                  Price (Monthly)
                </p>
                <p className="text-[#200009] font-[600] text-[20px]">
                  THB {selectedPackage?.price || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="right w-screen lg:w-[548px] lg:border border-[#D6D9E4] lg:rounded-[24px] overflow-hidden">
            <header className="flex justify-between items-center bg-[#F6F7FC] p-6">
              <h1 className="text-[20px] text-[#646C80] font-[600]">
                Credit Card
              </h1>
              <div className="flex gap-3">
                <img src={Visa} alt="Visa" />
                <img src={MasterCard} alt="MasterCard" />
              </div>
            </header>
            <div className="h-[372px] px-[16px] py-[24px] lg:px-[24px] lg:py-[32px] font-[400px]">
              <form
                onSubmit={handleConfirm}
                className="flex flex-col gap-[40px]"
              >
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block required-field mb-[4px]"
                  >
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="Number of card"
                    className="w-full px-[16px] py-[12px] border border-[#D6D9E4] rounded-[8px]"
                    onChange={handleCardNumber}
                    value={cardNumber}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardOwner"
                    className="block required-field mb-[4px]"
                  >
                    Card Owner
                  </label>
                  <input
                    id="cardOwner"
                    type="text"
                    placeholder="Holder of card"
                    className="w-full px-[16px] py-[12px] border border-[#D6D9E4] rounded-[8px] mb-[4px]"
                    onChange={handleNameCard}
                    value={nameCard}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="cardExpiry"
                      className="block required-field mb-[4px]"
                    >
                      Expiry Date
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-[16px] py-[12px] border border-[#D6D9E4] rounded-[8px]"
                      onChange={handleExpCard}
                      value={expCard}
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="cardVerification"
                      className="block required-field mb-[4px]"
                    >
                      CVC/CVV
                    </label>
                    <input
                      id="cardVerification"
                      type="text"
                      placeholder="CVC"
                      className="w-full px-[16px] py-[12px] border border-[#D6D9E4] rounded-[8px]"
                      onChange={handleCVCCard}
                      value={cvcCard}
                    />
                  </div>
                </div>
                {textAlert && <p className="text-red-500">{textAlert}</p>}
              </form>
            </div>
            <footer className="items-center px-6 pt-6 pb-8 flex justify-between border-t border-[#D6D9E4]">
              <button
                onClick={() => navigate("/")}
                className="text-[#C70039] px-[4px] py-[8px] text-[16px] font-[700]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-[#C70039] text-white rounded-full py-[12px] px-[24px] drop-shadow-lg font-[700]"
              >
                Payment Confirm
              </button>
            </footer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentForm;
