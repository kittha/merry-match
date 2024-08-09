import { useContext } from "react";
import { MatchContext } from "../contexts/MatchProvider";

export const useMatch = () => useContext(MatchContext);
