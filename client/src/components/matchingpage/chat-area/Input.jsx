import { useEffect, useState, useRef } from "react";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";
import emoji from "/assets/matchingpage/icons8-smiling-face-with-heart-48-yellow.png";
import EmojiPicker from "emoji-picker-react";
import useToggle from "../../../hooks/useToggle.mjs";
import { useImage } from "../../../hooks/useImage.mjs";

const InputSection = ({ handleSendMsg }) => {
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const { isOpen, toggle, setIsOpen } = useToggle();
  const emojiRef = useRef();

  useEffect(() => {
    const handleMousedown = (event) => {
      if (emojiRef && !emojiRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files;
    console.log(file[0]?.type);
    if (file[0]?.type.includes("image")) {
      setInputFile(event.target.files[0]);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    let newInput = inputText;
    newInput += emojiObject.emoji;
    setInputText(newInput);
  };

  const handleSubmit = () => {
    handleSendMsg(inputText, inputFile);
    setInputText("");
    setInputFile(null);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className="input-section w-full border-t border-[#424C6B] h-[72px] lg:h-[100px] py-3 px-4 lg:py-[26px] lg:px-[60px] flex flex-row items-center gap-2 lg:gap-6"
    >
      <label htmlFor="input-file">
        <img
          src={upload}
          alt="upload-image-icon"
          className="insert-image bg-[#f6f7fc] rounded-full w-12 h-12 object-none hover:cursor-pointer"
        />
      </label>
      <input
        id="input-file"
        type="file"
        onChange={(event) => handleFileChange(event)}
        hidden
      />
      <div className="emojiPicker" ref={emojiRef}>
        <img
          src={emoji}
          alt="emoji-picker-icon"
          className="emoji bg-none w-10 h-10 hover:cursor-pointer"
          onClick={toggle}
        />
        {isOpen && (
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            previewConfig={{ showPreview: false }}
            theme="dark"
            style={{
              position: "absolute",
              bottom: "12%",
              left: "3%",
            }}
          />
        )}
      </div>
      {inputFile ? (
        <div className="image-preview-container flex-1 relative">
          <img
            className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
            src={URL.createObjectURL(inputFile)}
            alt="preview-file"
            // draggable
            // onDragStart={(event) => handleDragStart(event, index)}
            // onDragOver={handleDragOver}
            // onDrop={(event) => handleDrop(event, index)}
          />
          <button
            className="delete-button w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white absolute top-1 left-[140px]"
            onClick={() => setInputFile(null)}
          >
            x
          </button>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Message here..."
          className="input-msg flex-1 placeholder:text-[#9B9EAD] text-[#9B9EAD] bg-transparent focus:outline-none"
          value={inputText}
          onChange={(event) => {
            setInputText(event.target.value);
          }}
        />
      )}
      <button type="submit">
        <img
          src={send}
          alt="send-icon"
          className="send bg-[#C70039] rounded-full w-12 h-12 object-none"
        />
      </button>
    </form>
  );
};

export default InputSection;
