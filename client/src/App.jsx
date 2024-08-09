import UnauthenticatedApp from "./pages/router/UnauthenticatedApp";
import AuthenticatedApp from "./pages/router/AuthenticatedApp";
import useAuth from "./hooks/useAuth";

const App = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? (<AuthenticatedApp />) : (<UnauthenticatedApp />);
};

export default App;
