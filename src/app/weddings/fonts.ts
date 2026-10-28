import { Cormorant_Garamond } from "next/font/google";

// Loaded only on the weddings page, so the rest of the site doesn't download it.
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
