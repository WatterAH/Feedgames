import type { Metadata } from "next";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import Providers from "./providers";
import { Pacifico, Raleway, Montserrat, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Feedgames",
  description: "Share your passion for gaming.",    
  openGraph: {
    title: "FeedGames: for gamers",
    description: "FeedGames is the ultimate hub for passionate gamers. Share your best plays, analyze your match stats, and connect with a community that lives and breathes video games. Take your gaming experience to the next level!",
    url: "https://feedgames.vercel.app",
    siteName: "FeedGames",
    images: [
      {
        url: "https://feedgames.vercel.app/icon.png", // Ruta a tu imagen representativa
        width: 1200,
        height: 630,
        alt: "FeedGames - for gamers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FeedGames: for gamers",
    description: "Comparte estadísticas de Valorant y más.",
    images: ["https://feedgames.vercel.app/icon.png"],
  },
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
    <html lang="en" className="">
      <body
        className={`${pacifico.variable} ${raleway.variable} ${montserrat.variable} ${inter.variable} antialiased duration-500 bg-[var(--foreground)] lg:bg-[var(--background)]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
