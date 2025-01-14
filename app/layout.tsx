import type { Metadata } from "next";

import "./globals.scss";

import GoogleAnalytics from "@/components/core/google-analytics";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Otobüsüm Nerede",
  description: "İzmir otobüslerinin durağınıza kaç durak uzaklıkta olduğunu öğrenebileceğiniz, kullanıcı dostu bir uygulama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />

        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
