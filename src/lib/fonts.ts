import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  Instrument_Serif,
  Inter,
  Libre_Bodoni,
  Sora,
  Source_Sans_3,
} from "next/font/google";

export const analyticsSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-analytics-sans",
});

export const analyticsSerif = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-analytics-serif",
});

export const searchDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-search-display",
});

export const searchSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-search-sans",
});

export const storylineSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-storyline-serif",
});

export const storylineSerifBold = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-storyline-serif-bold",
});

export const storylineSans = Inter({
  subsets: ["latin"],
  variable: "--font-storyline-sans",
});
