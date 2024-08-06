import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
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

function AgeRange({ filterData, setfilterData }) {
  const minDistance = 1;
  const [value, setValue] = useState([18, 80]);
  const [ageSlider, setAgeSlider] = useState([]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setfilterData((prevData) => ({
        ...prevData,
        searchAgeRangeNumberLeft: Math.min(newValue[0], value[1] - minDistance),
      }));
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setfilterData((prevData) => ({
        ...prevData,
        searchAgeRangeNumberRight: Math.max(
          newValue[1],
          value[0] + minDistance
        ),
      }));
    }
  };

  const valueChange18 = () => {
    if (value[0] < 18) {
      setValue([18, value[1]]);
    } else if (value[0] > value[1]) {
      setValue([value[1] - 1, value[1]]);
    } else if (value[0] > 80) setValue([79, 80]);
  };

  const valueChange80 = () => {
    if (value[1] > 80) {
      setValue([value[0], 80]);
    } else if (value[1] < value[0]) {
      setValue([value[0], value[0] + 1]);
    } else if (value[1] < 18) setValue([18, 19]);
  };

  const handleValueChangeRight = (key, name) => {
    setValue([value[0], Number(name)]);
    setfilterData((prevData) => ({ ...prevData, [key]: Number(name) }));
  };

  const handleValueChangeLeft = (key, name) => {
    setValue([Number(name), value[1]]);
    setfilterData((prevData) => ({ ...prevData, [key]: Number(name) }));
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
            onChange={(e) =>
              handleValueChangeLeft("searchAgeRangeNumberLeft", e.target.value)
            }
            onBlur={valueChange18}
            type="number"
            max="80"
            min="18"
            value={value[0]}
          />
        </div>
        <p className="mx-[5px]">-</p>
        <div className="w-[50%] h-[48px] flex items-center border-[#CCD0D7] border-[1px] rounded-md">
          <input
            className="h-[24px] w-[100%] ml-[12px] mr-[16px] mt-[12px] mb-[12px] outline-none"
            onChange={(e) =>
              handleValueChangeRight(
                "searchAgeRangeNumberRight",
                e.target.value
              )
            }
            onBlur={valueChange80}
            type="number"
            min="18"
            max="80"
            value={value[1]}
          />
        </div>
      </div>
    </div>
  );
}

export default AgeRange;
