"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthToggleProvider } from "@/components/authScreen/context/authContext";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { ProfileProvider } from "@/context/ProfileContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get current route

  return (
    <html lang="en">
      <AuthToggleProvider>
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextTopLoader height={5} />

          <ProfileProvider>
            {pathname !== "/" && (
              <>
                <Navbar />
                <br />
                <br />
                <br />
              </>
            )}

            {children}
          </ProfileProvider>
        </body>
      </AuthToggleProvider>
    </html>
  );
}
