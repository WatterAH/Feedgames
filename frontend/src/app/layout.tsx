import type { Metadata } from "next";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import { Pacifico, Raleway, Montserrat, Inter } from "next/font/google";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Feedgames",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
  weight: "400",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pacifico.variable} ${raleway.variable} ${montserrat.variable} ${inter.variable} antialiased scrollbar-thumb-slate-700 scrollbar-thumb-rounded-full scrollbar-track-white scrollbar-track-rounded-full`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
