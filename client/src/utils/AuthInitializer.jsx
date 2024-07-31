import useAuth from "../hooks/useAuth";

const AuthInitializer = ({ children }) => {
  useAuth(); // This initializes the auth hook

  return <>{children}</>;
};

export default AuthInitializer;