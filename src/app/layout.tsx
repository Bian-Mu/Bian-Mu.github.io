import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Blog Is Born",
  icons: {
    icon: "/avatar.jpg",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
