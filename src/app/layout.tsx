"use client";
import { useState, lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";
import Loader from "../components/common/Loader";
import { GeistSans, GeistMono } from "geist/font";
import { useAuthStore } from "../store/authStore"; // Import the global store
import { useAuthLayout } from "@/hooks/useAuthLayout"; // Import the custom hook

// Lazy load the layouts
const AuthenticatedLayout = lazy(() => import("./AuthenticatedLayout"));
const UnauthenticatedLayout = lazy(() => import("./UnauthenticatedLayout"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated: authenticated } = useAuthStore(); // Use global state
  const [loading, setLoading] = useState(true);
  const authLayout = useAuthLayout(); // Use the custom hook to get authLayout value
  console.log("🚀 ~ authLayout:", authLayout)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      console.log("Auth Status:", authStatus); // Verify the auth status
      useAuthStore.getState().setAuth(authStatus); // Update global state
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              {authLayout || authenticated ? (
                <AuthenticatedLayout>{children}</AuthenticatedLayout>
              ) : (
                <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
              )}
            </Suspense>
          )}
        </div>
      </body>
    </html>
  );
}