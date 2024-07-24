import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authentication";

const DevToolbar = () => {
  const { state, isAuthenticated } = useAuth();

  const userId = state && state.user ? state.user.id : null;
  // console.log("userId= ", userId);

  const floatLeftStyle = {
    position: "fixed",
    float: "left",
    top: "50px",
    left: "15px",
    // backgroundColor: "lightgray",
    backgroundColor: "transparent",
    padding: "3px",
    zIndex: 100,
  };

  const buttonStyle = {
    border: "1px solid #000",
    flex: "1 0 auto",
    minWidth: "100px",
  };

  const toolbarStyle = {
    fontSize: "2.5vw",
    // fontSize: "1.3vw",
    color: "red",
    maxWidth: "100%",
    flexWrap: "wrap",
  };

  useEffect(() => {
    // console.log("boom");
  }, [userId]);

  return (
    <div style={floatLeftStyle}>
      <ul style={toolbarStyle}>
        <li style={buttonStyle}>
          <Link style={buttonStyle} to="/matching">
            MatchingPage |
          </Link>
          <Link style={buttonStyle} to="/matchingArea">
            MatchingArea |
          </Link>
          <Link style={buttonStyle} to="/">
            HomePageAuthen |
          </Link>
          <Link style={buttonStyle} to={`/user-profile/${userId}`}>
            UserProfilePage(mem) |
          </Link>

          <br />
          <Link style={buttonStyle} to="/membership">
            MembershipPage |
          </Link>

          <Link style={buttonStyle} to="/package">
            MerryPackage |
          </Link>

          <br />

          <Link style={buttonStyle} to="/payment">
            PaymentFormPage |
          </Link>
          <Link style={buttonStyle} to="/payment/success">
            PaymentSuccessPage |
          </Link>
          <br />
          <Link style={buttonStyle} to="*">
            404 redirect |
          </Link>
          <Link style={buttonStyle} to="/login">
            loginBug |
          </Link>
          <br />
          <Link style={buttonStyle} to="/register">
            registerBug |
          </Link>
          {isAuthenticated ? (
            <p style={{ backgroundColor: "green" }}>isLogin</p>
          ) : (
            <p style={{ backgroundColor: "red" }}>notLogin</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DevToolbar;
