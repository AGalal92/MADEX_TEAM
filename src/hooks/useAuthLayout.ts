// hooks/useAuthLayout.ts
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useAuthLayout = () => {
  const pathname = usePathname(); // Get the current route
  const [authLayout, setAuthLayout] = useState(false); // State to track authLayout

  // Update authLayout based on the pathname
  useEffect(() => {
    if (pathname === "/login") {
      setAuthLayout(true); // Set authLayout to true if the pathname is /login
    } else {
      setAuthLayout(false); // Otherwise, set it to false
    }
  }, [pathname]);

  return authLayout; // Return the authLayout value
};