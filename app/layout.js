import "./globals.css";
import { StoreProvider } from "../lib/store";

export const metadata = {
  title: "DevLink.ai — Verified Real-World Engineering Experience",
  description:
    "AI-driven micro-internship & peer-vetted project marketplace for CS students and early-stage startups.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
