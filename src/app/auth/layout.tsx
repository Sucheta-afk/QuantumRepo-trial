import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Quantum Repo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
