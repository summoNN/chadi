import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Chadi — Motion Designer & Creative Developer",
  description:
    "Portfolio of Chadi, a motion designer and creative developer specializing in visual storytelling through Videastz.",
  keywords: ["motion design", "portfolio", "creative developer", "Videastz", "3D"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
