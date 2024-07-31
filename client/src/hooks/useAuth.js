import { useEffect, useContext } from "react";
import supabase from "../utils/supabaseClient";
import { AuthContext } from "../contexts/authentication";

const useAuth = () => {
  const { setState } = useContext(AuthContext);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setState({
            user: session.user,
            session,
          });
        } else {
          setState({
            user: null,
            session: null,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setState]);

  return null;
};

export default useAuth;
