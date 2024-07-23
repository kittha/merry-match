import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/homepage/Footer";
import { usePopup } from "../../hooks/usePopup.mjs";
import ProfilePopup from "../../components/profilepage/ProfilePopup";
import BasicInformationSection from "../../components/profilepage/BasicInformationSection";
import IdentitiesSection from "../../components/profilepage/IdentitiesSection";
import ProfilePicturesSections from "../../components/profilepage/ProfilePicturesSections";
import ModalPopup from "../../components/profilepage/DeletePopup";
import { getProfileData } from "../../hooks/connectProfile.mjs";
import { useContext } from "react";
import { FormContext } from "../../contexts/FormProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserProfilePage() {
  const {
    isPopupOpen,
    openPopup,
    closePopup,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    handleDeleteProfile,
    isDeleteConfirmationOpen,
  } = usePopup();

  const { formData, setFormData, handleSubmit } = useContext(FormContext);
  const { userId } = useParams();
  const fetchData = async () => {
    const data = await getProfileData(userId);
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:w-screen w-auto lg:h-screen bg-[#FCFCFE] flex flex-col gap-[80px] pt-[120px]">
      <div className="lg:w-screen w-auto mx-auto  bg-[#FCFCFE]">
        <div className="lg:w-[931px] lg:h-[1647px] w-auto h-auto flex flex-col items-center lg:items-end gap-[80px] pb-[50px] mx-auto font-Nunito">
          <div className="lg:w-[931px] h-[145px] w-auto flex lg:flex-row flex-col lg:gap-[80px] gap-[20px]">
            <header className="lg:w-[517px] h-[145px] flex flex-col gap-[8px] lg:mt-0 mt-[60px] lg:pl-0 pl-[20px]">
              <p className="text-[#7B4429] font-semibold text-base leading-6 w-[517px] h-[21px]">
                PROFILE
              </p>

              <h2 className="text-[#A62D82] text-[46px] leading-[57.5px] font-extrabold text-left lg:w-[517px] w-auto lg:h-[116px] h-auto">
                Let’s make profile <br /> to let others know you
              </h2>
            </header>
            <div className="lg:w-[414px] w-[338px] lg:h-[145px] h-[48px] flex flex-row items-end justify-center lg:mt-0 md:mt-[2300px] mt-[2450px] mx-auto">
              <div className="flex gap-[16px]">
                <button
                  className="w-[162px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full bg-[#FFE1EA] text-[#95002B] text-center font-bold text-base leading-6"
                  onClick={openPopup}
                >
                  Preview Profile
                </button>
                {isPopupOpen && (
                  <ProfilePopup profileData={formData} onClose={closePopup} />
                )}
                <button
                  className="w-[156px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full font-bold text-base leading-6 text-center text-[#FFFFFF] bg-[#C70039]"
                  onClick={handleSubmit}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          <BasicInformationSection />
          <IdentitiesSection />
          <ProfilePicturesSections />
          <div className="w-[128px] h-[32px] rounded-[16px] pt-[4px] pr-[8px] pb-[4px] pl-[8px] lg:mt-[-10px] mt-[60px]">
            <button
              className="w-[112px] h-[24px] font-semibold text-[16px] leading-[24px] text-[#646D89]"
              onClick={openDeleteConfirmation}
            >
              Delete account
            </button>
            {isDeleteConfirmationOpen && (
              <ModalPopup
                close={closeDeleteConfirmation}
                handleDeleteProfile={handleDeleteProfile}
              />
            )}
          </div>
        </div>
        <footer className="lg:w-screen w-auto lg:mt-[150px]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
export default UserProfilePage;
