import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diet and Wellness",
  description:
    "Diet & Wellness is a modern health and fitness platform focused on helping users achieve their wellness goals through smart nutrition tools and personalized guidance. The app includes calorie calculators, custom diet plan generation, progress tracking, and wellness management features. Users can also connect with professional coaches and nutrition specialists for personalized support, making the platform a complete solution for healthy lifestyle transformation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}
