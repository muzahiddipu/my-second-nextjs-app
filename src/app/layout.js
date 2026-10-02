import { Geist, Geist_Mono } from "next/font/google";
import { FavoritesProvider } from "./components/FavoritesProvider";
import SiteNav from "./components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Common Table | Food, found well",
    template: "%s | Common Table",
  },
  description:
    "Discover thoughtful dishes, compare local prices, and save the meals you want to make or find.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#f6f7f3] font-sans text-[#17271e]">
        <FavoritesProvider>
          <SiteNav />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
