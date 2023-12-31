import { PageTheme } from "@/types/PageTheme";
import { FONT, THEME } from "@prisma/client";

export const pagethemes: PageTheme[] = [
  {
    name: "VIOLET",
    color: "#7c3aed",
    darkColor: "#6d28d9",
    styles: {
      background: "224 71.4% 0%",
      foreground: "210 20% 100%",
      card: "224 71.4% 0%",
      cardForeground: "210 20% 100%",
      popover: "224 71.4% 0%",
      popoverForeground: "210 20% 100%",
      primary: "263.4 70% 50.4%",
      primaryForeground: "210 20% 100%",
      secondary: "215 27.9% 16.9%",
      secondaryForeground: "210 20% 100%",
      muted: "215 27.9% 16.9%",
      mutedForeground: "217.9 10.6% 64.9%",
      accent: "215 27.9% 16.9%",
      accentForeground: "210 20% 100%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "210 20% 100%",
      border: "215 27.9% 16.9%",
      input: "215 27.9% 16.9%",
      ring: "263.4 70% 50.4%",
      radius: "1rem",
    },
  },

  {
    name: "YELLOW",
    color: "#fcc538",
    darkColor: "#fcc538",
    styles: {
      background: "20 14.3% 0%",
      foreground: "60 9.1% 100%",
      card: "20 14.3% 0%",
      cardForeground: "60 9.1% 100%",
      popover: "20 14.3% 0%",
      popoverForeground: "60 9.1% 100%",
      primary: "47.9 95.8% 53.1%",
      primaryForeground: "26 83.3% 14.1%",
      secondary: "12 6.5% 15.1%",
      secondaryForeground: "60 9.1% 100%",
      muted: "12 6.5% 15.1%",
      mutedForeground: "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      accentForeground: "60 9.1% 100%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "60 9.1% 100%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "35.5 91.7% 32.9%",
      radius: "1rem",
    },
  },

  {
    name: "ZINC",
    color: "#191919",
    darkColor: "#FAFAFA",
    styles: {
      background: "240 10% 3.9%",
      foreground: "0 0% 100%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 100%",
      popover: "240 10% 3.9%",
      popoverForeground: "0 0% 100%",
      primary: "0 0% 100%",
      primaryForeground: "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 100%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 100%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "0 0% 100%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
      radius: "1rem",
    },
  },

  {
    name: "ORANGE",
    color: "#E78B22",
    darkColor: "#E57949",
    styles: {
      background: "20 14.3% 0%",
      foreground: "60 9.1% 100%",
      card: "20 14.3% 0%",
      cardForeground: "60 9.1% 100%",
      popover: "20 14.3% 0%",
      popoverForeground: "60 9.1% 100%",
      primary: "20.5 90.2% 48.2%",
      primaryForeground: "60 9.1% 100%",
      secondary: "12 6.5% 15.1%",
      secondaryForeground: "60 9.1% 100%",
      muted: "12 6.5% 15.1%",
      mutedForeground: "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      accentForeground: "60 9.1% 100%",
      destructive: "0 72.2% 50.6%",
      destructiveForeground: "60 9.1% 100%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "20.5 90.2% 48.2%",
      radius: "1rem",
    },
  },
  {
    name: "VIOLET_LIGHT",
    color: "#7c3aed",
    darkColor: "#6d28d9",
    styles: {
      background: "0 0% 100%",
      foreground: "224 71.4% 4.1%",
      card: "0 0% 100%",
      cardForeground: "224 71.4% 4.1%",
      popover: "0 0% 100%",
      popoverForeground: "224 71.4% 4.1%",
      primary: "262.1 83.3% 57.8%",
      primaryForeground: "210 20% 98%",
      secondary: "220 14.3% 95.9%",
      secondaryForeground: "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      mutedForeground: "220 8.9% 46.1%",
      accent: "220 14.3% 95.9%",
      accentForeground: "220.9 39.3% 11%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "210 20% 98%",
      border: "220 13% 91%",
      input: "220 13% 91%",
      ring: "262.1 83.3% 57.8%",
      radius: "1rem",
    },
  },
  {
    name: "YELLOW_LIGHT",
    color: "#fcc538",
    darkColor: "#fcc538",
    styles: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      cardForeground: "20 14.3% 4.1%",
      popover: "0 0% 100%",
      popoverForeground: "20 14.3% 4.1%",
      primary: "47.9 95.8% 53.1%",
      primaryForeground: "26 83.3% 14.1%",
      secondary: "60 4.8% 95.9%",
      secondaryForeground: "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      mutedForeground: "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      accentForeground: "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "20 14.3% 4.1%",
      radius: "1rem",
    },
  },
  {
    name: "ZINC_LIGHT",
    color: "#191919",
    darkColor: "#FAFAFA",
    styles: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      popover: "0 0% 100%",
      popoverForeground: "240 10% 3.9%",
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      secondaryForeground: "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      accentForeground: "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 5.9% 10%",
      radius: "1rem",
    },
  },
  {
    name: "ORANGE_LIGHT",
    color: "#E78B22",
    darkColor: "#E57949",
    styles: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      cardForeground: "20 14.3% 4.1%",
      popover: "0 0% 100%",
      popoverForeground: "20 14.3% 4.1%",
      primary: "24.6 95% 53.1%",
      primaryForeground: "60 9.1% 97.8%",
      secondary: "60 4.8% 95.9%",
      secondaryForeground: "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      mutedForeground: "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      accentForeground: "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "24.6 95% 53.1%",
      radius: "1rem",
    },
  },
];

type FontVariables = {
  [key in FONT]: string;
};

export const pageFonts: FontVariables = {
  [FONT.LATO]: "--font-lato",
  [FONT.QUICKSAND]: "--font-quicksand",
  [FONT.PLAYFAIR]: "--font-playfair",
  [FONT.CORMORANT]: "--font-cormorant",
};
