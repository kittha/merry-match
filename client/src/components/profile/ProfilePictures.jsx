import deleteButton from "../../assets/deleteButton.svg";

function ProfilePictures() {
  const avatars = {
    key1: null,
    key2: null,
    key3: null,
    key4: null,
    key5: null,
  };
  return (
    <div className="section-container flex flex-col gap-6">
      <div className="section-header">
        <h2>Profile pictures</h2>
        <p>Upload at least 2 photos</p>
      </div>
      <div className="picture-list  flex flex-row gap-6">
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
                className="image-remove-button absolute -top-4 right-0"
                src={deleteButton}
                onClick={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePictures;
