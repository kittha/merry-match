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

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    await handleSubmit(event, userId);
    alert("Profile updated successfully!");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="lg:w-screen lg:h-screen bg-[#FCFCFE] lg:pt-[171px] pt-[93px] ">
      <div className="lg:w-screen bg-[#FCFCFE]">
        <div className="lg:w-[931px] w-auto h-auto flex flex-col gap-[40px] lg:gap-[80px] lg:pb-[60px] mx-auto font-Nunito pb-[40px] max-lg:mb-[11px] max-lg:px-[16px]">
          <div className="lg:w-[931px] w-auto flex lg:flex-row flex-col lg:gap-[80px] gap-[20px] ">
            <header className="lg:w-[517px] flex flex-col gap-[8px]">
              <p className="text-[#7B4429] font-semibold text-base leading-6 lg:w-[517px] lg:h-[21px]">
                PROFILE
              </p>

              <h2 className="text-[#A62D82] text-[32px] lg:text-[46px] leading-[40px] lg:leading-[57.5px] text-left lg:w-[517px] w-auto lg:h-[116px] h-auto font-[700]">
                Let’s make profile <br /> to let others know you
              </h2>
            </header>
            <div className="lg:w-[414px] w-[338px] lg:h-[145px] h-[48px] flex flex-row items-end justify-center lg:mt-0 md:mt-[2300px] mt-[2450px] mx-auto max-lg:hidden">
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
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          <BasicInformationSection />
          <IdentitiesSection />
          <ProfilePicturesSections />
          <div className="lg:hidden">
            <div className="flex justify-center gap-[16px]">
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
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="flex lg:justify-end justify-center items-center">
            <div className="w-[128px] h-[32px] py-[4px] px-[8px]">
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
        </div>
        <footer className="lg:w-screen">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default UserProfilePage;
