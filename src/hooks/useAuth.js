// hooks/useAuth.ts
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { isAuthenticated } from "../utils/auth";

export const useAuth = () => {
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      console.log("Auth Status:", authStatus); // Verify the auth status
      setAuth(authStatus); // Update global state
    };

    checkAuth();
  }, [setAuth]); // Only include setAuth in the dependency array
};