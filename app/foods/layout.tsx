import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food cards",
  description: "Food card online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
