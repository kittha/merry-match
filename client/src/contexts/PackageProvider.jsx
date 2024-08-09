import { createContext, useState } from "react";

export const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
};
