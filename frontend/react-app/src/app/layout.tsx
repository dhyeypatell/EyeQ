import "../styles/reset.scss";
import { Inter } from "next/font/google";
import data from "./metadata.json";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  ...data.metadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
