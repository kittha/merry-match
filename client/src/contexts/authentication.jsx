import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStoredData } from "../utils/sessionManager";
import { initializeTokenRefresh, clearAuthDataAndRedirect } from "../utils/tokenUtils";

export const AuthContext = React.createContext();


function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
    role: "",
    authenticated: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/check-auth`,
          data, {
            withCredentials: true,
          }
        );

        // console.log("checkAuth response", response.data.authenticated);

        const data = getStoredData();
        if (data && response.data.authenticated) {
          setState({
            loading: false,
            authenticated: true,
            error: null,
            user: data,
            role: data.role,
          });
        } else {
          setState((prevState) => ({ ...prevState, loading: false, authenticated: false }));
        }

      } catch (error) {
        console.error("Authentication check failed:", error);
        setState(prevState => ({
          ...prevState,
          loading: false,
          user: null,
          role: "",
          authenticated: false,
        }));
      }
    };

    checkAuth();
  }, []);


  useEffect(() => {
    return initializeTokenRefresh();
  }, []);

  // make a login request
  const login = async (data) => {
    try {
      setState(prevState => ({ ...prevState, error: null, loading: true }));

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        data, {
          withCredentials: true,
        }
      );

      // console.log(result);

      localStorage.setItem("data", JSON.stringify(result.data.data));

      const userDataFromPayload = result.data.data;
      const authenticatedFromPayload = result.data.authenticated;
      // console.log("login", userDataFromPayload);
      
      setState({
        ...state,
        user: userDataFromPayload,
        role: userDataFromPayload.role,
        loading: false,
        authenticated: authenticatedFromPayload,
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
        authenticated: false,
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
    console.log("calling logout function");
    try {
      setState({ ...state, user: null, role: "", error: null, authenticated: false });
      clearAuthDataAndRedirect();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = state.authenticated;

  return (
    <AuthContext.Provider
      value={{ state, setState, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
