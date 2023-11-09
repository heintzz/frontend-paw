import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata = {
  title: "Fintrack",
  description: "Personal Financial Tracking App",
  icons: {
    icon: [
      '/favicon.ico?v=1'
    ],
    apple: [
      '/apple-touch-icon.png?v=1'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
};

export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
