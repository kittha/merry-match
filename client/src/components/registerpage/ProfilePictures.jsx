import { useState } from "react";
import plus from "../../assets/profilepicture/plus.png";
function ProfilePictures() {
  const [avatars, setAvatars] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleFileChange = (event, avatarKey) => {
    const selectedFile = event.target.files[0];
    setAvatars((prevAvatars) => ({
      ...prevAvatars,
      [avatarKey]: selectedFile,
    }));
    event.target.value = null;
  };

  const handleDeleteClick = (avatarKey) => {
    setAvatars((prevAvatars) => ({
      ...prevAvatars,
      [avatarKey]: null,
    }));
  };

  const handleDragStart = (event, avatarKey) => {
    event.dataTransfer.setData("avatarKey", avatarKey);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetAvatarKey) => {
    const sourceAvatarKey = event.dataTransfer.getData("avatarKey");
    if (sourceAvatarKey !== targetAvatarKey) {
      const updatedAvatars = { ...avatars };
      const temp = updatedAvatars[targetAvatarKey];
      updatedAvatars[targetAvatarKey] = updatedAvatars[sourceAvatarKey];
      updatedAvatars[sourceAvatarKey] = temp;
      setAvatars(updatedAvatars);
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
          {Object.keys(avatars).map((avatarKey) => (
            <div
              key={avatarKey}
              className="input-container"
              draggable
              onDragStart={(event) => handleDragStart(event, avatarKey)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, avatarKey)}
            >
              {avatars[avatarKey] ? (
                <div className="image-preview-container w-[167px] h-[167px] relative">
                  <img
                    key={avatarKey}
                    className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
                    src={URL.createObjectURL(avatars[avatarKey])}
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
    </div>
  );
}

export default ProfilePictures;
