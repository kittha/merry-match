import { useContext } from "react";
import { MerryLimitContext } from "../contexts/MerryLimitProvider";

export const useMerryLimit = () => useContext(MerryLimitContext);
