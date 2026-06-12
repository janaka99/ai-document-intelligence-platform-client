import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { LoadingPage } from "@/components/LoadingPage";
import { SidebarProvider } from "@/contexts/sidebarContext";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI Document Intelligence Platform",
  description: "Advanced document processing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${poppins.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
