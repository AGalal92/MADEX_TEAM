// src/utils/auth.js
export const isAuthenticated = () => {
  // Check if a token exists in localStorage or cookies
  const token = localStorage.getItem('authToken'); // or get from cookies
  return !!token; // Return true if token exists, false otherwise
};