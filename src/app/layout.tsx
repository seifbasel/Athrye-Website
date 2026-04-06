import "./globals.css";
import type { Metadata } from "next";
import { SidebarWrapper } from "@/features/side-bar/sidebar-wrapper";
import { Footer } from "@/features/footer/footer";
import localFont from "next/font/local";

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const playfairDisplay = localFont({
  src: [
    {
      path: "./fonts/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "./fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "400 900",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Athrye | Numismatic Marketplace",
  description:
    "Discover, collect, and trade authenticated coins through Athrye's premium numismatic marketplace.",
  keywords: [
    "coins",
    "numismatics",
    "collectibles",
    "rare coins",
    "coin trading",
  ],
  icons: {
    icon: [
      { url: "/brand/athrye-symbol.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/brand/athrye-symbol.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen bg-background">
          <div className="flex min-h-screen">
            <SidebarWrapper />
            <div className="flex min-w-0 flex-1 flex-col">
              <main className="mt-16 md:mt-0 flex-1 overflow-x-hidden p-6 md:p-8 md:pl-19">
                <div className="mx-auto w-full max-w-360">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
