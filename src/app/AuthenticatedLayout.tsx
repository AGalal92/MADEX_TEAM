"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import React, { useEffect, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("🚀 ~ hello from AuthenticatedLayout:")
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {children}
    </div>
  );
}
