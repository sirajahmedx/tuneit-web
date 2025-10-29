import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AuthData {
  user: any; // Adjust type as needed
}

interface AuthState {
  data: AuthData | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export function useAuth(): AuthState {
  const { data: session, status: sessionStatus } = useSession();
  const [authState, setAuthState] = useState<AuthState>({
    data: null,
    status: "loading",
  });

  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user) {
      setAuthState({
        data: { user: session.user },
        status: "authenticated",
      });
    } else if (sessionStatus === "unauthenticated") {
      // Fallback to custom token
      fetch("/api/auth/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setAuthState({
              data: { user: data.user },
              status: "authenticated",
            });
          } else {
            setAuthState({
              data: null,
              status: "unauthenticated",
            });
          }
        })
        .catch(() => {
          setAuthState({
            data: null,
            status: "unauthenticated",
          });
        });
    } else {
      setAuthState({
        data: null,
        status: "loading",
      });
    }
  }, [session, sessionStatus]);

  return authState;
}
