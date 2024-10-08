import plus from "../../../public/assets/profilepicture/plus.png";
import { useForm } from "../../hooks/useForm";
import { useImage } from "../../hooks/useImage.mjs";

function ProfilePictures() {
  const { formData, errors } = useForm();
  const { handleAvatarChange, handleAvatarSwap } = useImage();

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
    <div className="w-full h-auto flex justify-center lg:justify-start mb-[12px] lg:mb-[341px]">
      <div className="section-container flex flex-col mt-[37px] lg:mt-[80px] w-full  ">
        <div className="section-header">
          <h2 className="text-[#A62D82] text-[24px] font-[700] leading-[30px]">
            Profile pictures
          </h2>
          <p className="text-[#424C6B] text-[16px] font-[400] leading-[24px] mt-[4px]">
            Upload at least 2 photos
          </p>
        </div>
        <div className="picture-list flex  flex-row flex-wrap gap-2  lg:gap-3  mt-[24px]  lg:justify-start">
          {[...Array(5).keys()].map((avatarKey) => (
            <div key={avatarKey} className="input-container">
              {formData.avatars[avatarKey] ? (
                <div className="image-preview-container w-[167px] h-[167px] relative">
                  <img
                    key={avatarKey}
                    className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
                    src={URL.createObjectURL(formData.avatars[avatarKey])}
                    alt={`Preview ${avatarKey}`}
                    draggable
                    onDragStart={(event) => handleDragStart(event, avatarKey)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, avatarKey)}
                  />
                  <button
                    className="deleteButton w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white flex justify-center items-center absolute top-2 right-2"
                    onClick={() => handleAvatarChange("delete", avatarKey)}
                  >
                    x
                  </button>
                </div>
              ) : (
                <label htmlFor={`upload-${avatarKey}`}>
                  <div className="upload-placeholder gap-2 w-[167px] h-[167px]  bg-[#F1F2F6] rounded-2xl flex flex-col justify-center items-center cursor-pointer text-[#7D2262]">
                    <img src={plus} alt="Upload Icon" />
                    <p className="text-[14px] font-[500]">Upload photo</p>
                  </div>
                </label>
              )}
              <input
                id={`upload-${avatarKey}`}
                name="avatar"
                type="file"
                onChange={(event) =>
                  handleAvatarChange("add", avatarKey, event)
                }
                hidden
              />
            </div>
          ))}
          {errors.avatars && <div className="error">{errors.avatars}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePictures;
