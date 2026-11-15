import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PIXEL PERFECT — Streets & Stories • Abhishek Gangwar",
  description: "Archival street photography portfolio and long-form field essays by Abhishek Gangwar from New Delhi, Mumbai, Varanasi, Kolkata, and the Indian subcontinent. Photographed on Canon EOS R10.",
  keywords: ["PIXEL PERFECT", "Abhishek Gangwar", "Streets & Stories", "Street Photography", "Canon EOS R10", "Field Essays", "Travel Dispatches", "New Delhi", "Mumbai", "Varanasi", "Kolkata", "Hyderabad"],
  openGraph: {
    title: "PIXEL PERFECT • Abhishek Gangwar",
    description: "Street Photography & Journals — Indian Streets",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-[#0A0A0A] selection:bg-black selection:text-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

