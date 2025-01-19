"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
import Loader from "@/components/common/Loader";

// Lazy load the layouts
const AuthenticatedLayout = lazy(() => import("./AuthenticatedLayout"));
const UnauthenticatedLayout = lazy(() => import("./UnauthenticatedLayout"));

export default function RootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Show a loading spinner while checking authentication
  if (loading) {
    return <Loader />; // Replace with a proper loading spinner
  }

  // Render the appropriate layout based on authentication status
  return (
    <Suspense fallback={<Loader />}>
      {authenticated ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      ) : (
        <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
      )}
    </Suspense>
  );
}