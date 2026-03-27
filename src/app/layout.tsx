import "./globals.css";
import type { Metadata } from "next";
import { SidebarWrapper } from "@/features/side-bar/sidebar-wrapper";
import { Footer } from "@/features/footer/footer";
import { Montserrat, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { OrderProvider } from "@/context/order-context";
import Providers from "./query-provider";

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
  title: "Coinat - Numismatic Marketplace",
  description: "Discover, buy and sell authenticated coins from around the world.",
  keywords: ["coins", "numismatics", "collectibles", "rare coins", "coin trading"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <OrderProvider>
                  <div className="min-h-screen bg-background">
                    <div className="flex min-h-screen">
                      <SidebarWrapper />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <main className="mt-10 flex-1 overflow-x-hidden p-6 md:p-8 md:pl-19">
                          <div className="mx-auto w-full max-w-[1440px]">
                            {children}
                          </div>
                        </main>
                        <Footer />
                      </div>
                    </div>
                  </div>
                </OrderProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
