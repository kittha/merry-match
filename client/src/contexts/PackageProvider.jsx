import React, { createContext, useState, useContext } from "react";

const PackageContext = createContext();

export const usePackage = () => useContext(PackageContext);

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
};
