import { useContext } from "react";
import { PackageContext } from "../contexts/PackageProvider";

export const usePackage = () => useContext(PackageContext);
