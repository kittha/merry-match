import { useEffect, useState } from "react";
import axios from "axios";

const BackendServerStatus = () => {
  const [status, setStatus] = useState("Checking...");
  const [details, setDetails] = useState("");

  const checkServerStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/status`
      );
      if (response.status === 200) {
        setStatus("Online");
        setDetails(response.data);
      } else {
        setStatus("Offline");
        setDetails(`Status code: ${response.status}`);
      }
    } catch (error) {
      setStatus("Offline");
      setDetails(error.message);
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const handleClick = () => {
    checkServerStatus();
  };

  return (
    <div>
      <h1>Backend Server Status</h1>
      <p>Status: {status}</p>
      <p>
        If you see a long string of HTML code below, it means you forgot to set
        the .env file.
      </p>
      {details && <pre>{JSON.stringify(details, null, 2)}</pre>}
      <button onClick={handleClick}>Check Server Status</button>
    </div>
  );
};

export default BackendServerStatus;
