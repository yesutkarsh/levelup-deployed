import "./globals.css";
import { Inter } from "next/font/google";
import { ScheduleProvider } from "./AdminMentor/components/Availability/components/ScheduleContext"; // ✅ Correct path

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard for Mentor Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <ScheduleProvider>
          {" "}
          {/* ✅ Wrap everything inside ScheduleProvider */}
          {children}
        </ScheduleProvider>
      </body>
    </html>
  );
}
