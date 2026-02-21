import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Dcode Portfolio",
  description: "It is the website that showcase my skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}