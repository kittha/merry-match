import { useState } from "react";
import send from "/assets/matchingpage/send-button.png";
import upload from "/assets/matchingpage/upload-image-button.png";

const InputSection = ({ handleSendMsg }) => {
  const [inputText, setInputText] = useState("");

  return (
    <form
      onSubmit={(event) => {
        handleSendMsg(event, inputText);
        setInputText("");
      }}
      className="input-section w-full border-t border-[#424C6B] h-[72px] lg:h-[100px] py-3 px-4 lg:py-[26px] lg:px-[60px] flex flex-row gap-4 lg:gap-6"
    >
      <label htmlFor="input-file">
        <img
          src={upload}
          alt="insert-icon"
          className="insert-image bg-white rounded-full w-12 h-12 object-none hover:cursor-pointer"
        />
      </label>
      <input id="input-file" type="file" hidden />
      <input
        type="text"
        placeholder="Message here..."
        className="input-msg flex-1 placeholder:text-[#9B9EAD] text-[#9B9EAD] bg-transparent focus:outline-none"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
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
