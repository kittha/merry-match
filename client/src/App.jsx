import UnauthenticatedApp from "./pages/router/UnauthenticatedApp";
import AuthenticatedApp from "./pages/router/AuthenticatedApp";
import { useAuth } from "./contexts/authentication";

import { MerryLimitProvider } from "./contexts/MerryLimitProvider";
import { ChatProvider } from "./contexts/chat";

const App = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <MerryLimitProvider>
      <ChatProvider>
        <AuthenticatedApp />
      </ChatProvider>
    </MerryLimitProvider>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
