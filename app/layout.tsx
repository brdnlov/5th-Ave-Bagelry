import type { Metadata } from "next";
import { Kumbh_Sans, Bevan } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh",
});

const bevan = Bevan({
  subsets: ["latin"],
  variable: "--font-bevan",
  weight: "400",
});

export const metadata: Metadata = {
  title: "5th Ave Bagelry",
  description: "5th Ave Bagelry - fresh bagels in Downtown Long Beach.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${kumbhSans.variable} ${bevan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}