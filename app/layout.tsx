import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const rounded = M_PLUS_Rounded_1c({
  variable: "--font-rounded",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tre Jackson",
  description:
    "Theodore Jackson III: computer science student at the University of Cincinnati. Open to a Summer 2026 co-op.",
};

export const viewport: Viewport = {
  themeColor: "#f4f6f7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rounded.variable}>
      <body>{children}</body>
    </html>
  );
}
