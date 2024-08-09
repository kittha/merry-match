import  { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const portalRootRef = useRef(document.createElement("div")); // Create a ref for the portal root element

  useEffect(() => {
    const portalRoot = portalRootRef.current;
    document.body.appendChild(portalRoot); // Append portal root element to the DOM

    return () => {
      document.body.removeChild(portalRoot); // Clean up: remove portal root element from the DOM
    };
  }, []);

  return ReactDOM.createPortal(children, portalRootRef.current);
};

export default Portal;
