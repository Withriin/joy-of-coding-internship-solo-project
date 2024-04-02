import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/NavBar";
import {ViewportProvider} from "@/app/components/ViewPortContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your daily tasks efficiently and effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ViewportProvider>
    <html lang="en">
      <body className={inter.className}>
      <NavBar />
      <main>{children}</main>
      </body>
    </html>
      </ViewportProvider>
  );
}
