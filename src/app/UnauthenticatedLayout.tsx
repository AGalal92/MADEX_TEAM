import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import React from "react";
import { GeistSans, GeistMono } from "geist/font";
import "../css/globals.css";
import "../css/bootstrap.min.css";
import "../css/aos.css";
import "../css/glightbox.min.css";
import "../css/swiper-bundle.min.css";
import "../css/css2.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      {children}
    </div>
  );
}