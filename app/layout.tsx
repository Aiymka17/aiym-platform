import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIYM AI — Мұғалімнің интеллектуалды көмекшісі",
  description: "Қазақстан мұғалімдеріне арналған AI платформасы",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  );
}
