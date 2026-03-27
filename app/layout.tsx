import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BARB",
    default: "Behaviour Analysis Registration Board of Sri Lanka (BARB)",
  },
  description: "Propelling the field of Behaviour Analysis in Sri Lanka. The regulatory body for behaviour therapy professionals.",
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "BARB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          raleway.variable,
          openSans.variable,
          "antialiased min-h-screen flex flex-col"
        )}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
