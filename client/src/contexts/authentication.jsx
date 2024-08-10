import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStoredData } from "../utils/sessionManager";
import { initializeTokenRefresh } from "../utils/tokenUtils";

export const AuthContext = React.createContext();


function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStoredData();
    // console.log(data);
    if (data) {
      setState({
        loading: false,
        error: null,
        user: data,
        role: data.role,
      });
    } else {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  useEffect(() => {
    return initializeTokenRefresh();
  }, []);

  // make a login request
  const login = async (data) => {
    try {
      setState({ ...state, error: null, loading: true });

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        data
      );

      // FIXME NEED TO MIGRATE FROM STORING JWT TOKEN IN LOCAL STORAGE
      // USE HttpOnly Cookie for SECURE STORAGE
      const token = result.data.session.access_token;
      const refreshToken = result.data.session.refresh_token;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("step 1 set refreshToken", refreshToken);
      localStorage.setItem("data", JSON.stringify(result.data));

      // const userDataFromToken = jwtDecode(token);
      // console.log(userDataFromToken);

      const userDataFromPayload = result.data;

      // console.log("login", userDataFromPayload);

      setState({
        ...state,
        user: userDataFromPayload,
        role: userDataFromPayload.role,
        loading: false,
      });

      if (userDataFromPayload.role === "Admin") {
        navigate("/admin/package");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "An unexpected error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      setState({
        ...state,
        error: errorMessage,
        loading: false,
      });
    }
  };

  // register the user
  const register = async (data, resetForm) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
        data
      );

      navigate("/login");
      resetForm();
      alert("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // clear the token in localStorage and the user data
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
      setState({ ...state, user: null, role: "", error: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, setState, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
