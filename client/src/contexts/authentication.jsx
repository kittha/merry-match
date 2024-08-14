import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

// this is a hook that consume AuthContext

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
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
    const refreshToken = async () => {
      const refresh_token = localStorage.getItem("refreshToken");
      if (refresh_token) {
        try {
          const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh-token`,
            { refresh_token }
          );

          const token = result.data.session.access_token;
          const newRefreshToken = result.data.session.refresh_token;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", newRefreshToken);
          localStorage.setItem("data", JSON.stringify(result.data));

          const userDataFromPayload = result.data;

          setState({
            ...state,
            user: userDataFromPayload,
            role: userDataFromPayload.role,
          });
        } catch (error) {
          // console.error("Error refreshing token:", error);
          logout();
        }
      }
    };

    const interval = setInterval(refreshToken, 15 * 60 * 1000); // 15 * 60 * 1000 = Refresh every 15 minutes
    return () => clearInterval(interval);
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
      const refreshToken = result.data.session.refresh_token;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
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
      // console.error("Login error:", error);

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
      // console.error("Registration error:", error);
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
      // console.error("Logout error:", error);
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
