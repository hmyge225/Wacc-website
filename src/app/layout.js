import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import { AppProviders } from "./providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Next Feature Starter",
    template: "%s | Next Feature Starter",
  },
  description:
    "Une base Next.js organisée par fonctionnalités, prête pour votre prochain projet.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
