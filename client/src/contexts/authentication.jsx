import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDecodedToken, isTokenExpired } from "../utils/jwtHelper";

export const AuthContext = React.createContext();

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
    role: "",
  });
  const navigate = useNavigate();

  const setAuthState = (authState) => {
    setState((prevState) => ({
      ...prevState,
      ...authState,
    }));
  };

  
  const refreshSession = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
          { refreshToken }
        );
        const { access_token, refresh_token } = response.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        return access_token;
      } catch (error) {
        console.error("Error refreshing session:", error);
        throw error;
      }
    }
    return null;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await refreshSession();
      if (token) {
        const userData = JSON.parse(localStorage.getItem("data"));
        if (userData) {
          setState({
            ...state,
            user: userData,
            role: userData.role,
          });
        }
      }
    };
    initializeAuth();
  }, []);

  // make a login request
  const login = async (data) => {
    try {
      setState({ ...state, error: null, loading: true });

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        data
      );

      const token = result.data.session.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("data", JSON.stringify(result.data));
      localStorage.setItem("refreshToken", result.data.session.refresh_token);

      // const userDataFromToken = jwtDecode(token);
      // console.log(userDataFromToken);

      const userDataFromPayload = result.data;

      // console.log("login", userDataFromPayload);

      setState({
        ...state,
        user: userDataFromPayload,
        role: userDataFromPayload.role,
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
        error: error.response.data.message,
        loading: false,
      });
    }
  };

  // register the user
  const register = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
        data
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "An unexpected error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
    }
  };

  // clear the token in localStorage and the user data
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      setState({ ...state, user: null, error: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated, setAuthState }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
