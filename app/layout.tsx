import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });
const test = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web magic crafter",
  description: "Personal website of a web developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-stone-950 relative`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
