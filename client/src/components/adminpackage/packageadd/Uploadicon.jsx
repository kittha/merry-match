function UploadIcon({ icon, setIcon }) {
  const handleFileChange = (event) => {
    setIcon({
      ...icon,
      image: event.target.files[0],
    });
    event.target.value = null;
  };

  const handleRemoveImage = (event, iconKey) => {
    event.preventDefault();
    const updatedIcons = { ...icon };
    delete updatedIcons[iconKey];
    setIcon(updatedIcons);
  };

  return (
    <div className="input-container">
      {Object.keys(icon).length > 0 ? (
        Object.keys(icon).map((iconKey) => {
          const file = icon[iconKey];
          return (
            <div
              key={iconKey}
              className="image-preview-container w-[100px] h-[132px]"
            >
              <p className="text-base font-normal mb-[8px]">
                Icon <span className="text-[#AF2758]">*</span>
              </p>
              <img
                className="image-preview w-[100px] h-[100px] rounded-2xl"
                src={URL.createObjectURL(file)}
                alt="icon"
              />
              <button
                className="rounded-full w-[24px] h-[24px] bg-[#AF2758] relative bottom-[105px] left-20 text-white drop-shadow-RedButton"
                onClick={(event) => handleRemoveImage(event, iconKey)}
              >
                <p className="relative bottom-[1px]">x</p>
              </button>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col">
          <p className="text-base font-normal mb-[8px]">
            Icon <span className="text-[#AF2758]">*</span>
          </p>
          <label className="w-[10px] h-[100px]" htmlFor="upload-icon">
            <div className="placeholder-content w-[100px] h-[100px] bg-[#F6F7FC] rounded-2xl flex flex-col gap-[8px] justify-center items-center cursor-pointer text-[#7D2262] ">
              <img
                className="w-[24px] h-[24px]"
                src="../src/assets/Frame.svg"
                alt="Frame"
              />
              <p className="text-[14px]">Upload icon</p>
            </div>
          </label>
        </div>
      )}
      <input
        id="upload-icon"
        name="upload-icon"
        type="file"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}

export default UploadIcon;
