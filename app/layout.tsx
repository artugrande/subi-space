import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUBI · Space Universal Basic Income",
  description: "Renta de recursos espaciales → humanos verificados → stablecoins locales en Celo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
