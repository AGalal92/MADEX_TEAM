"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAuthStore } from "@/store/authStore";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const logo = "/logo.svg";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend authentication endpoint
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage or cookies
        localStorage.setItem("authToken", data.token);
       // Update global state
       useAuthStore.getState().setAuth(true);
       router.push("/"); // Use `replace` instead of `push`
      
      } else {
        // Handle authentication errors
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-boxdark-2">
      <div className="w-full max-w-4xl rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap">
          {/* Left Column */}
          <div className="hidden w-full items-center justify-center p-8 xl:block xl:w-1/2">
            <div className="text-center">
              <Link className="mb-8 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
              </p>

              <div className="mt-8">
                <svg
                  width="350"
                  height="350"
                  viewBox="0 0 350 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Paths */}
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-8 sm:p-12 xl:p-16">
              <span className="mb-4 block text-lg font-medium text-gray-600 dark:text-gray-300">
              Sign In
              </span>
              <h2 className="mb-8 text-3xl font-bold text-black dark:text-white">
              MADEX dashboard
              </h2>

              {error && (
                <div className="mb-6 rounded-lg bg-red-100 p-3 text-center text-red-600 dark:bg-red-900 dark:text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                    <span className="absolute right-4 top-3 text-gray-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-4 pr-10 text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                    <span className="absolute right-4 top-3 text-gray-400">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2 12l3-3m0 0l3 3m-3-3v10"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary py-3 text-white transition duration-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Sign In
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Don’t have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;