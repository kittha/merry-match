import BasicInformation from "../../components/registerpage/Information";
import IdentitiesAndInterests from "../../components/registerpage/Interests";
import ProfilePictures from "../../components/registerpage/ProfilePictures";
import Footer from "../../components/homepage/Footer";

function UserProfilePage() {
  return (
    <>
      <div className="w-full h-full bg-[#FCFCFE]">
        <nav className="w-auto h-[88px] bg-[#FFFFFF] border border-black">
          แปะไว้รอใส่ Navbar
        </nav>
        <div className="w-[1440px] h-[1787px] bg-[#FCFCFE] mx-auto">
          <div className="w-[931px] h-[1647px] flex flex-col items-center mx-auto relative top-[80px]">
            <div className="w-[931px] h-[145px] flex items-end">
              <header className="w-[517px] h-[145px] ">
                <p className="text-[#7B4429] font-Nunito font-semibold text-base leading-6 w-517 h-21">
                  PROFILE
                </p>
                <h2 className="text-[#A62D82] font-Nunito text-4xl font-bold leading-[57.5px] tracking-tighter text-left w-[517px] h-[116px]">
                  Let’s make profile to let others know you
                </h2>
              </header>
              <div className="flex gap-8">
                <button className="w-[162px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full p-[12px 24px] bg-[#FFE1EA] text-[#95002B] text-center font-bold font-Nunito text-base leading-6">
                  Preview Profile
                </button>
                <button className="w-[156px] h-[48px] p-[12px, 24px, 12px, 24px] rounded-full font-Nunito font-bold text-base leading-6 text-center text-[#FFFFFF] bg-[#C70039]">
                  Update Profile
                </button>
              </div>
            </div>
            <div className="mt-[-10px] font-Nunito">
              <BasicInformation />
            </div>
            <div className="mt-[-120px] font-Nunito">
              <IdentitiesAndInterests />
            </div>
            <div className="mt-[-200px] font-Nunito">
              <ProfilePictures />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default UserProfilePage;
