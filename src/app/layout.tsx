import "./globals.css";
import type { Metadata } from "next";
import { SidebarWrapper } from "@/features/side-bar/sidebar-wrapper";
import { Footer } from "@/features/footer/footer";
import { Montserrat, Playfair_Display } from "next/font/google";
import { Header } from "@/features/header/header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background dark:bg-background-dark ${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen">
          <SidebarWrapper />
          <div className="flex-1 flex flex-col">
            <Header />
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
