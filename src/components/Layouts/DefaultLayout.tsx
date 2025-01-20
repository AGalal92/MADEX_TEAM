"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header/index";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
     <div className="flex h-screen">
  {/* <!-- ===== Sidebar Start ===== --> */}
  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  {/* <!-- ===== Sidebar End ===== --> */}

  {/* <!-- ===== Content Area Start ===== --> */}
  <div className="relative flex flex-1 flex-col lg:ml-72.5 overflow-hidden">
    {/* <!-- ===== Header Start ===== --> */}
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    {/* <!-- ===== Header End ===== --> */}

    {/* <!-- ===== Main Content Start ===== --> */}
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 h-full">
        {children}
      </div>
    </main>
    {/* <!-- ===== Main Content End ===== --> */}
  </div>
  {/* <!-- ===== Content Area End ===== --> */}
</div>

    </>
  );
}
