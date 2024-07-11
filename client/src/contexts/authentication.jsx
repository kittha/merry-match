import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // make a login request
  const login = async (data) => {
    try {
      setState({ ...state, error: null, loading: true });

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        data
      );
      console.log(result);
      const token = result.data.session.access_token;
      localStorage.setItem("token", token);

      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });

      navigate("/");
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
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
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
      setState({ ...state, user: null, error: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
