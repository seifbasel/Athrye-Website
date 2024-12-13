import "./globals.css";
import type { Metadata } from "next";
import { SidebarWrapper } from "@/features/side-bar/sidebar-wrapper";
import { Footer } from "@/features/footer/footer";
import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: false
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Coinat",
  description: "Buy and sell authentic coins from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfairDisplay.variable} font-sans`}>
        <div className="flex min-h-screen bg-background dark:bg-background-dark">
          <SidebarWrapper />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6 md:p-8 md:pl-[76px] overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
