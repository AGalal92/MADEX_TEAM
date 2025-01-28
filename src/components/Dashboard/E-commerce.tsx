"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const ECommerce: React.FC = () => {
  const router = useRouter(); // Initialize Next.js router
  return (
    <div className="h-[91.6vh] bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center text-white relative">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-4xl md:text-6xl font-bold mb-4 text-center px-4"
      >
        Welcome to <span className="text-yellow-400">Madex Team</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-lg md:text-xl text-gray-300 mb-8 text-center px-4"
      >
        Your Dashboard Controller for Seamless Operations
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/about")} // Route to /abouts on click
        className="bg-yellow-400 text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        Get Started
      </motion.button>

      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      >
        {/* Floating Circles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, x: Math.random() * 100 }}
            animate={{ y: "100vh", x: Math.random() * 100 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 90}vh`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ECommerce;
