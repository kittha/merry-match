import { useEffect, useContext } from "react";
import supabase from "../utils/supabaseClient";
import { AuthContext } from "../contexts/authentication";

const useAuth = () => {
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setAuthState({
            user: session.user,
            session,
          });
        } else {
          setAuthState({
            user: null,
            session: null,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setAuthState]);

  return null;
};

export default useAuth;
