"use client";
import { useEffect, useState, lazy, Suspense, startTransition } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";
import Loader from "../components/common/Loader";
import { GeistSans, GeistMono } from "geist/font";
import { useAuthStore } from "../store/authStore"; // Import the global store

// Lazy load the layouts
const AuthenticatedLayout = lazy(() => import("./AuthenticatedLayout"));
const UnauthenticatedLayout = lazy(() => import("./UnauthenticatedLayout"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated: authenticated, setAuth } = useAuthStore(); // Use global state
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      console.log("Auth Status:", authStatus); // Verify the auth status
      setAuth(authStatus); // Update global state
      setLoading(false);
    };

    checkAuth();
  }, [setAuth]); // Only include setAuth in the dependency array


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
              {authenticated ? (
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