import React, { useEffect, useState } from "react";
import Checkmark from "../../../public/assets/membershipPage/checkmark.svg";
import axios from "axios";

function MembershipPackage({ userId }) {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/membership/${userId}`
        );
        setPackageData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-[24px] w-full">
      <h1 className="text-[#2A2E3F] font-[700] text-[24px]">
        Merry Membership Package
      </h1>
      {packageData ? (
        <div className="package-box bg-gradient-to-r from-[#742138] to-[#A878BF] px-[32px] pt-[32px] pb-[24px] rounded-[32px] drop-shadow-lg">
          <div className="flex gap-[86px] pb-[40px] border-b border-[#DF89C6]">
            <div className="flex gap-[16px]">
              <div className="flex gap-[16px] w-[319px]">
                <div className="bg-white rounded-[16px] size-[78px] p-[21px]">
                  <img
                    src={packageData.url}
                    className="size-[36px] "
                    alt="Package"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="font-[700] text-[32px] text-[#FFFFFF]">
                    {packageData.name}
                  </div>
                  <div>
                    <span className="text-[#EFC4E2] text-[20px] font-[600]">
                      THB {packageData.price}
                    </span>
                    <span className="text-[#EFC4E2] text-[16px] font-[400]">
                      /Month
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-[8px] text-[#F4EBF2] w-[357px]">
                {packageData.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex gap-[10px] items-center pl-[8px]"
                  >
                    <img
                      src={Checkmark}
                      className="size-[24px]"
                      alt="Checkmark"
                    />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F3E4DD] w-[80px] h-[32px] py-[4px] px-[16px] font-[800] text-[16px] text-[#B8653E] rounded-full">
              Active
            </div>
          </div>
          <div className="flex justify-end mt-[16px]">
            <button className="px-[8px] py-[4px] font-[700] text-white">
              Cancel Package
            </button>
          </div>
        </div>
      ) : (
        <div>No package data available</div>
      )}
    </div>
  );
}

export default MembershipPackage;
