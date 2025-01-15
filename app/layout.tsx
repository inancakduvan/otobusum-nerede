import type { Metadata } from "next";

import "./globals.scss";

import ClientSideCalculations from "@/components/core/client-side-calculations";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Otobüsüm Nerede",
  description: "İzmir otobüslerinin durağınıza kaç durak uzaklıkta olduğunu öğrenebileceğiniz, kullanıcı dostu bir uygulama.",  
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  authors: [
    { name: "İnanç Akduvan", url: "https://inancakduvan.vercel.app" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSideCalculations />

        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
