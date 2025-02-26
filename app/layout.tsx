import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {CssBaseline} from "@mui/material";
import {ToastProvider} from "@/contexts/ToastContext";
import StorageGuard from "@/components/guards/StorageGuard";
import AuthGuard from "@/components/guards/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFlow",
  description: "platform to create and manage events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <CssBaseline />
            <StorageGuard>
                <AuthGuard>
                    <ToastProvider>
                        {children}
                    </ToastProvider>
                </AuthGuard>
            </StorageGuard>
      </body>
    </html>
  );
}
