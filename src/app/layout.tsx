import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "GradSetu — Find your college. Hear it from someone who's there.",
  description: "Connect with verified Indian college students. Discover colleges, explore placement insights, compare universities, and book 1-on-1 mentorship calls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text-primary antialiased selection:bg-primary-secondary selection:text-primary-dark">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

