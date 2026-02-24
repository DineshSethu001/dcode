import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Dinesh Thanigaivel | MERN Stack Developer in India",
  description:
    "Dinesh Thanigaivel is a MERN Stack Developer specializing in React, Node.js, MongoDB, Express, and Tailwind CSS.",
  keywords: [
    "MERN Stack Developer",
    "React Developer India",
    "Node.js Developer",
    "Full Stack Developer",
  ],
  authors: [{ name: "Dinesh Thanigaivel" }],
  robots: "index, follow",
  openGraph: {
    title: "Dinesh Thanigaivel | MERN Stack Developer",
    description: "Full Stack MERN Developer building scalable web applications.",
    url: "https://yourdomain.com",
    siteName: "Dinesh Portfolio",
    images: [
      {
        url: "https://yourdomain.com/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}