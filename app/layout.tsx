import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";
import Header from "@/components/header";
import ApolloProviderWrapper from "@/components/apollo-provider";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TuneIt Web - Connect with Verified Mechanics",
  description:
    "A platform for car owners to post issues and connect with verified mechanics instantly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  const isAuthPage =
    pathname?.includes("/sign-in") ||
    pathname?.includes("/sign-up") ||
    pathname?.includes("/onboarding");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProviderWrapper>
            <SessionProvider>
              {!isAuthPage && <Header />}
              {children}
            </SessionProvider>
          </ApolloProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
