import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Purepix",
  description: "Purepix is a free online image editing tool that allows you to edit images, remove background, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
