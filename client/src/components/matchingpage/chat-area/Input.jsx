import { useEffect, useState, useRef } from "react";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";
import emoji from "/assets/matchingpage/icons8-smiling-face-with-heart-48-yellow.png";
import EmojiPicker from "emoji-picker-react";
import useToggle from "../../../hooks/useToggle.mjs";

const InputSection = ({ handleSendMsg }) => {
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const { isOpen, toggle, setIsOpen } = useToggle();
  const emojiRef = useRef();

  useEffect(() => {
    const inputTextElement = document.getElementsByClassName("input-msg")[0];
    const formElement = document.getElementsByTagName("form")[0];

    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        formElement.requestSubmit();
      }
    };

    inputTextElement.addEventListener("keydown", handleKeyDown);

    const handleMouseDown = (event) => {
      if (emojiRef && !emojiRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      inputTextElement.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files;
    console.log(file[0]);
    if (file[0]?.type.includes("image")) {
      setInputFile(event.target.files[0]);
    }
    event.target.value = null;
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
        accept="image/*"
        className="input-file-button absolute -z-10 rounded-full w-1 opacity-0"
        onChange={(event) => handleFileChange(event)}
      />
      {inputFile && (
        <div className="image-preview-container bg-white rounded-2xl absolute bottom-20 lg:bottom-28">
          <img
            className="image-preview w-[167px] h-[167px] rounded-2xl object-cover"
            src={URL.createObjectURL(inputFile)}
            alt="preview-file"
          />
          <button
            className="delete-button w-[24px] h-[24px] bg-[#AF2758] rounded-full text-white absolute top-1 right-1"
            onClick={() => setInputFile(null)}
          >
            x
          </button>
        </div>
      )}

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

      <textarea
        rows="1"
        wrap="soft"
        placeholder="Message here..."
        maxlength="1000"
        className="input-msg flex-1 resize-none placeholder:text-[#9B9EAD] text-[#9B9EAD]
        bg-transparent focus:outline-none "
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      ></textarea>

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
