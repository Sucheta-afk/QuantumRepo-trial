import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quantum Repo",
  description: "Login to Quantum Repo",
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
