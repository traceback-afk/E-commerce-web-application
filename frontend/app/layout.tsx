import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { WebProvider } from "../app/context/Context";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capstone",
  description: "Onlineshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
      </head>
      <body className={inter.className}>
        <WebProvider>
          <Providers>{children}</Providers>
        </WebProvider>
      </body>
    </html>
  );
}

