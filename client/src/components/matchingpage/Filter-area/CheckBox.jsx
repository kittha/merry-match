import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

function CheckBox({
  filterData,
  setfilterData,
  isCheckedMale,
  setIsCheckMale,
  isCheckedFemale,
  setIsCheckFemale,
  isCheckedBinary,
  setIsCheckBinary,
}) {
  const { state } = useAuth();
  const currentUserId = state.user?.id;
  const [profileData, setProfileData] = useState("");
  const getSexualPreference = async () => {
    let result;
    if (currentUserId) {
      try {
        result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles/${currentUserId}`
        );
        setProfileData(result.data.sexualPreference);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    getSexualPreference();
  }, [currentUserId]);

  const handleChange = (key, value, event, check) => {
    event;
    if (check === true) {
      setfilterData((prevData) => ({ ...prevData, [key]: "" }));
    } else {
      setfilterData((prevData) => ({ ...prevData, [key]: value }));
    }
  };

  return (
    <div className="flex flex-col gap-[16px] text-[#646D89] font-medium text-base ">
      <div className="flex items-center">
        {profileData === "Male" ? (
          <input
            type="checkbox"
            id="checkbox1"
            name="sex"
            checked={isCheckedMale}
            onChange={(event) =>
              handleChange(
                "checkMale",
                "Male",
                setIsCheckMale(event.target.checked),
                isCheckedMale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
        ) : profileData === "Female" ? (
          <input
            type="checkbox"
            id="checkbox1"
            name="sex"
            checked={isCheckedFemale}
            onChange={(event) =>
              handleChange(
                "checkFemale",
                "Female",
                setIsCheckFemale(event.target.checked),
                isCheckedFemale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
        ) : (
          <input
            type="checkbox"
            id="checkbox1"
            name="sex"
            checked={isCheckedBinary}
            onChange={(event) =>
              handleChange(
                "checkOther",
                "Other",
                setIsCheckBinary(event.target.checked),
                isCheckedBinary
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
        )}
        <label
          className="ml-[12px] peer-checked:text-[#2A2E3F] "
          htmlFor="checkbox1"
        >
          Default
        </label>
        <svg
          className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="19 6 9 17 4 12"></polyline>
        </svg>
      </div>
      {profileData === "Male" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox2"
            name="sex"
            checked={isCheckedFemale}
            onChange={(event) =>
              handleChange(
                "checkFemale",
                "Female",
                setIsCheckFemale(event.target.checked),
                isCheckedFemale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
          <label
            className="ml-[12px] peer-checked:text-[#2A2E3F]"
            htmlFor="checkbox2"
          >
            Female
          </label>
          <svg
            className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="19 6 9 17 4 12"></polyline>
          </svg>
        </div>
      ) : profileData === "Female" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox2"
            name="sex"
            checked={isCheckedMale}
            onChange={(event) =>
              handleChange(
                "checkMale",
                "Male",
                setIsCheckMale(event.target.checked),
                isCheckedMale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
          <label
            className="ml-[12px] peer-checked:text-[#2A2E3F]"
            htmlFor="checkbox2"
          >
            Male
          </label>
          <svg
            className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="19 6 9 17 4 12"></polyline>
          </svg>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox2"
            name="sex"
            checked={isCheckedMale}
            onChange={(event) =>
              handleChange(
                "checkMale",
                "Male",
                setIsCheckMale(event.target.checked),
                isCheckedMale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
          <label
            className="ml-[12px] peer-checked:text-[#2A2E3F]"
            htmlFor="checkbox2"
          >
            Male
          </label>
          <svg
            className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="19 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
      {profileData === "Male" || profileData === "Female" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox3"
            name="sex"
            checked={isCheckedBinary}
            onChange={(event) =>
              handleChange(
                "checkOther",
                "Other",
                setIsCheckBinary(event.target.checked),
                isCheckedBinary
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
          <label
            className="ml-[12px] peer-checked:text-[#2A2E3F]"
            htmlFor="checkbox3"
          >
            Non-binary people
          </label>
          <svg
            className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="19 6 9 17 4 12"></polyline>
          </svg>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox3"
            name="sex"
            checked={isCheckedFemale}
            onChange={(event) =>
              handleChange(
                "checkFemale",
                "Female",
                setIsCheckFemale(event.target.checked),
                isCheckedFemale
              )
            }
            className="relative peer shrink-0 appearance-none w-[24px] h-[24px] border-[1px] border-[#D6D9E4] rounded-[8px] bg-white  checked:bg-[#A62D82] checked:border-[1px] checked:border-[#DF89C6] "
          />
          <label
            className="ml-[12px] peer-checked:text-[#2A2E3F]"
            htmlFor="checkbox3"
          >
            Female
          </label>
          <svg
            className="mb-1 ml-[1px] absolute w-[20px] h-[20px] mt-1 hidden peer-checked:block pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="19 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}

export default CheckBox;
