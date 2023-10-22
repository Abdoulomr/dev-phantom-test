"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, Suspense, useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Loading from "./loading";
import { inter } from "@/utils/module";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [sideBarVisible, setSideBarVisible] = useState(true);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} relative bg-[#F1FFFA] mx-auto max-w-[2500px]`}
        suppressHydrationWarning={true}
      >
        <Topbar />
        <Sidebar
          sideBarVisible={sideBarVisible}
          setSideBarVisible={setSideBarVisible}
        />
        <Suspense fallback={<Loading />}>
          <main
            className={`flex min-h-screen flex-col items-start justify-start transition-all duration-300 ease-in-out  px-5 py-3 ${
              sideBarVisible && "md:ml-[250px]"
            }`}
          >
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}
