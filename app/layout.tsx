import type { Metadata } from "next";
import { Quicksand, Poppins } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/layout/ConditionalLayout";
import EntranceAnimation from "./components/entrance/EntranceAnimation";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curious Muslim | Stories of the Prophets",
  description:
    "Beautiful Islamic stories for Muslim children. Learn about Prophet Muhammad ﷺ through warm storytelling and stunning illustrations.",
  keywords:
    "Islamic books for children, Seerah for kids, Muslim children stories, Prophet Muhammad, Islamic education",
  authors: [{ name: "Curious Muslim" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Curious Muslim | Stories of the Prophets",
    description: "Beautiful Islamic stories for Muslim children",
    type: "website",
    locale: "en_US",
    siteName: "Curious Muslim",
  },
  twitter: {
    card: "summary_large_image",
    title: "Curious Muslim | Stories of the Prophets",
    description: "Beautiful Islamic stories for Muslim children",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <EntranceAnimation>
          <ConditionalLayout>{children}</ConditionalLayout>
        </EntranceAnimation>
      </body>
    </html>
  );
}
