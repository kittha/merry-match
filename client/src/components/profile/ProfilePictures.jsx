import deleteButton from "/src/assets/profilepicture/deleteButton.svg";
import { useState } from "react";

function ProfilePictures() {
  const [avatars, setAvatars] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleFileChange = (event, avatarKey) => {
    console.log(event.target.value);
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
    <div className="w-full h-[80%] flex justify-center mb-[341px]">
      <div className="section-container flex flex-col h-[249px] mt-[80px]">
        <div className="section-header">
          <h2 className="text-[#A62D82] text-[24px] font-[700] leading-[30px]">
            Profile pictures
          </h2>
          <p className="text-[#424C6B] text-[16px] font-[400] leading-[24px] mt-[4px]">
            Upload at least 2 photos
          </p>
        </div>
        <div className="picture-list  flex flex-row gap-6 mt-[24px] ">
          {Object.keys(avatars).map((avatarKey) => (
            <div
              key={avatarKey}
              className="input-container"
              draggable
              onDragStart={(event) => handleDragStart(event, avatarKey)}
              onDragOver={(event) => handleDragOver(event)}
              onDrop={(event) => handleDrop(event, avatarKey)}
            >
              {avatars[avatarKey] ? (
                <div className="image-preview-container w-[167px] h-[167px]">
                  <img
                    key={avatarKey}
                    className="image-preview w-[167px] h-[167px] rounded-2xl "
                    src={URL.createObjectURL(avatars[avatarKey])}
                    alt={`Preview ${avatarKey}`}
                  />
                  <button
                    className="rounded-full w-[24px] h-[24px] bg-[#AF2758]  relative bottom-44 left-[150px] text-white"
                    onClick={() => handleDeleteClick(avatarKey)}
                  >
                    <p className="relative bottom-[2px]">x</p>
                  </button>
                </div>
              ) : (
                <label htmlFor={`upload-${avatarKey}`}>
                  <div className="upload-placeholder">
                    <div className="placeholder-content w-[167px] h-[167px] bg-gray-200 rounded-2xl flex flex-col justify-center items-center cursor-pointer text-[#7D2262]">
                      <p>+</p>
                      <p>Upload photo</p>
                    </div>
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
