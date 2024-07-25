import UnauthenticatedApp from "./pages/router/UnauthenticatedApp";
import AuthenticatedApp from "./pages/router/AuthenticatedApp";
import { useAuth } from "./contexts/authentication";

import { MerryLimitProvider } from "./contexts/MerryLimitProvider";

const App = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <MerryLimitProvider>
      <AuthenticatedApp />
    </MerryLimitProvider>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
