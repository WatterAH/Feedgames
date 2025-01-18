import type { Metadata } from "next";
import "./globals.css";
import "react-photo-view/dist/react-photo-view.css";
import Providers from "./providers";
import { Pacifico, Raleway, Montserrat, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Feedgames",
  description: "Share your passion for gaming.",
  keywords:
    "gaming, community, feed, social, stats, valorant, esports, gamers, leaderboard, passion, share, follow, content creators, gameplay, interaction, statistics, gaming community, videojuegos, comunidad, feed, social, estadísticas, valorant, esports, gamers, clasificaciones, pasión, compartir, seguir, creadores de contenido, jugabilidad, interacción, estadísticas de juegos, comunidad gamer",

  openGraph: {
    title: "Feedgames, share your passion for gaming.",
    description:
      "FeedGames es el centro definitivo para jugadores apasionados. Comparte tus mejores jugadas, analiza las estadísticas de tus partidos y conéctate con una comunidad que vive y respira videojuegos. ¡Lleva tu experiencia de juego al siguiente nivel!",
    url: "https://feedgames.vercel.app",
    siteName: "Feedgames",
    images: [
      {
        url: "https://feedgames.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "FeedGames - para gamers",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedgames, share your passion for gaming.",
    description: "Comparte tu pasión por los juegos",
    images: ["https://feedgames.vercel.app/opengraph-image.png"],
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
