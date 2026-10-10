import type { Metadata, Viewport } from "next";
import { Outfit, Righteous } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";
import "./globals.css";

const f0 = Righteous({ variable: "--font-righteous", subsets: ["latin"], weight: "400" });
const f1 = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

const EN = strings.en as Record<string, string>;
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='20' fill='%233b2a6b'/%3E%3Cpath d='M22 30l10 26 10-26z' fill='%23f2c27a'/%3E%3Ccircle cx='32' cy='28' r='11' fill='%23ffb3d1'/%3E%3Ccircle cx='32' cy='18' r='9' fill='%2399e6c7'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#3b2a6b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${f0.variable} ${f1.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
