import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant"
});

import { CustomerProvider } from "@/context/CustomerContext";
import { SessionManager } from "@/components/SessionManager";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { MyOrdersDrawer } from "@/components/MyOrdersDrawer";
import { OrderSuccessToast } from "@/components/OrderSuccessToast";

export const metadata: Metadata = {
  title: "Premium QR Ordering | Restro",
  description: "Scan, order, and track your premium dining experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          montserrat.variable,
          cormorant.variable,
          "font-sans antialiased bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground"
        )}
      >
        <CustomerProvider>
          <CartProvider>
            <SessionManager />
            <CartDrawer />
            <MyOrdersDrawer />
            <OrderSuccessToast />
            {children}
          </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
