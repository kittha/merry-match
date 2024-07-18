import "react-datepicker/dist/react-datepicker.css";
import plus from "/assets/profilepicture/plus.png";

import { useProfileData } from "../../components/userprofilepage/useProfileData";

function ProfilePicturesSections() {
  const {
    avatars,
    handleFileChange,
    handleDeleteClick,
    handleDragStart,
    handleDragOver,
    handleDrop,
    checkImage,
  } = useProfileData();


  return (
    <>

            <div className="flex flex-col w-full lg:pl-0 lg:pr-0 pl-[16px] pr-[16px] lg:w-[930px]">
              <div className="section-header">
                <h2 className=" text-[#A62D82] text-[24px] font-[700] leading-[30px] lg:text-left">
                  Profile pictures
                </h2>
                <p className="text-[#424C6B] text-[16px] font-[400] leading-[24px] mt-[4px] lg:text-left">
                  Upload at least 2 photos
                </p>
              </div>
              <div className="picture-list lg:w-auto flex lg:flex-row flex-wrap lg:gap-[22px] gap-[22px] mt-[24px] mx-auto lg:mx-0 w-full">
                {Object.keys(avatars).map((avatarKey) => (
                  <div
                    key={avatarKey}
                    className="input-container"
                    draggable
                    onDragStart={(event) => handleDragStart(event, avatarKey)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, avatarKey)}
                  >
                    {console.log(avatars[avatarKey])}
                    {avatars[avatarKey] ? (
                      <div className="image-preview-container w-[167px] h-[167px] relative">
                        <img
                          key={avatarKey}
                          className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
                          src={checkImage(avatars[avatarKey])}
                          alt={`Preview ${avatarKey}`}
                        />
                        <button
                          className="deleteButton w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white flex justify-center items-center absolute top-2 right-2"
                          onClick={() => handleDeleteClick(avatarKey)}
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      <label htmlFor={`upload-${avatarKey}`}>
                        <div className="upload-placeholder gap-2 w-[167px] h-[167px]  bg-[#F1F2F6] rounded-2xl flex flex-col justify-center items-center cursor-pointer text-[#7D2262]">
                          <img src={plus}></img>
                          <p className="text-[14px] font-[500]">Upload photo</p>
                        </div>
                      </label>
                    )}
                    <input
                      id={`upload-${avatarKey}`}
                      name="avatar"
                      type="file"
                      onChange={(event) => handleFileChange(event, avatarKey)}
                      hidden
                    />
                  </div>
                ))}
              </div>
            </div>
    </>
  );
}
export default ProfilePicturesSections;
