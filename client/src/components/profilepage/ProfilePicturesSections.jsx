import plus from "/assets/profilepicture/plus.png";
import { useForm } from "../../hooks/useForm";
import { useImage } from "../../hooks/useImage.mjs";

function ProfilePicturesSections() {
  const { formData, errors } = useForm();
  const { checkImage, handleAvatarChange, handleAvatarSwap } = useImage();

  const handleDragStart = (event, avatarKey) => {
    event.dataTransfer.setData("avatarKey", avatarKey);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetAvatarKey) => {
    const sourceAvatarKey = event.dataTransfer.getData("avatarKey");
    if (sourceAvatarKey !== targetAvatarKey) {
      handleAvatarSwap(sourceAvatarKey, targetAvatarKey);
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-[930px]">
      <div className="section-header">
        <h2 className=" text-[#A62D82] text-[24px] font-[700] leading-[30px] lg:text-left">
          Profile pictures
        </h2>
        <p className="text-[#424C6B] text-[16px] font-[400] leading-[24px] mt-[4px] lg:text-left">
          Upload at least 2 photos
        </p>
      </div>
      <div className="picture-list lg:w-auto flex lg:flex-row flex-wrap lg:gap-[22px] gap-[8px] mt-[24px] mx-auto lg:mx-0 w-full">
        {/* {Object.keys(formData.avatars).map((avatarKey) => ( */}
        {[...Array(5).keys()].map((index) => (
          <div key={index} className="input-container">
            {formData.avatars[index] ? (
              <div className="image-preview-container w-[167px] h-[167px] relative">
                <img
                  key={index}
                  className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
                  src={checkImage(formData.avatars[index])}
                  alt={`Preview ${index}`}
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}
                />
                <button
                  className="deleteButton w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white flex justify-center items-center absolute top-2 right-2"
                  onClick={() => handleAvatarChange("delete", index)}
                >
                  x
                </button>
              </div>
            ) : (
              <label htmlFor={`upload-${index}`}>
                <div className="upload-placeholder gap-2 w-[167px] h-[167px]  bg-[#F1F2F6] rounded-2xl flex flex-col justify-center items-center cursor-pointer text-[#7D2262]">
                  <img src={plus}></img>
                  <p className="text-[14px] font-[500]">Upload photo</p>
                </div>
              </label>
            )}
            <input
              id={`upload-${index}`}
              name="avatar"
              type="file"
              onChange={(event) => {
                handleAvatarChange("add", index, event);
              }}
              hidden
            />
          </div>
        ))}
        {errors.avatars && <div className="error">{errors.avatars}</div>}
      </div>
    </div>
  );
}
export default ProfilePicturesSections;
