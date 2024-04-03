import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/NavBar";
import {ViewportProvider} from "@/app/components/ViewPortContext";
import '@radix-ui/themes/styles.css';
import {Theme} from "@radix-ui/themes";
import { ThemeProvider } from 'next-themes';

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
      <ThemeProvider attribute='class'>
      <Theme accentColor="orange">
      <NavBar />
      <main>{children}</main>
      </Theme>
      </ThemeProvider>
      </body>
    </html>
      </ViewportProvider>
  );
}
