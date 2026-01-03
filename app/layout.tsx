import type { Metadata } from "next";
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "./context/AdminContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ovo",
});

export const metadata: Metadata = {
  title: "Dcode Portfolio",
  description: "It is the website that show case my skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <body className={`${outfit.variable} ${ovo.variable} font-outfit overflow-x-hidden antialiased`}>
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
