import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const AgeSliderStyle = styled(Slider)({
  color: "#A62D82",
  height: 2,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 11,
    width: 11,
    //color-button
    backgroundColor: "#DF89C6",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-rail": {
    color: "#C8CCDB",
  },
});

function AgeRange() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-[13px] lg:w-[188px] lg:h-[122px]">
      <p className="text-[#2A2E3F] font-bold text-base">Age Range</p>
      <div className="flex justify-center ">
        <Box sx={{ width: 330, height: 26 }}>
          <AgeSliderStyle
            value={value}
            onChange={handleChange}
            disableSwap
            min={18}
            max={80}
          />
        </Box>
      </div>
      <div className="flex h-[48px] justify-center items-center ">
        <div className="w-[50%] h-[48px] flex  items-center border-[#CCD0D7] border-[1px] rounded-md">
          <input
            className="h-[24px] w-[100%] ml-[12px] mr-[16px] mt-[12px] mb-[12px] outline-none"
            type="number"
            max="80"
            min="18"
          />
        </div>
        <p className="mx-[5px]">-</p>
        <div className="w-[50%] h-[48px] flex items-center border-[#CCD0D7] border-[1px] rounded-md">
          <input
            className="h-[24px] w-[100%] ml-[12px] mr-[16px] mt-[12px] mb-[12px] outline-none"
            type="number"
            min="18"
            max="80"
          />
        </div>
      </div>
    </div>
  );
}

export default AgeRange;
