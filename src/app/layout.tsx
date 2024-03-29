import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/apollo/apollo-wrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privasee - Q&As",
  description: "Privasee Q&A Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <ApolloWrapper>
          {children}
          <Toaster toastOptions={{ className: inter.className }} />
        </ApolloWrapper>
      </body>
    </html>
  );
}
