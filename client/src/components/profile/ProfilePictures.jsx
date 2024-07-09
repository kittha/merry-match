import deleteButton from "/src/assets/profilepicture/deleteButton.svg";

function ProfilePictures() {
  const avatars = {
    key1: null,
    key2: null,
    key3: null,
    key4: null,
    key5: null,
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
          {Object.keys(avatars).map((avatarKey) => {
            // const file = avatars[avatarKey];
            return (
              <div key={avatarKey} className="picture-container relative">
                <img
                  className="picture-preview w-[167px] aspect-square rounded-2xl"
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                  // {URL.createObjectURL(file)}
                  // alt={file.name}
                />
                {/*  onClick={(event) => handleRemoveImage(event, avatarKey)} */}
                <img
                  className="image-remove-button absolute -top-4 -right-4"
                  src={deleteButton}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfilePictures;
