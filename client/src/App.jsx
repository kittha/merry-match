import UnauthenticatedApp from "./pages/router/UnauthenticatedApp";
import AuthenticatedApp from "./pages/router/AuthenticatedApp";
import { useAuth } from "./contexts/authentication";
import { MatchProvider } from "./contexts/matchProvider";
import { ChatProvider } from "./contexts/chatProvider";
import { MerryLimitProvider } from "./contexts/MerryLimitProvider";

const App = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <MerryLimitProvider>
      <MatchProvider>
        <ChatProvider>
          <AuthenticatedApp />
        </ChatProvider>
      </MatchProvider>
    </MerryLimitProvider>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
