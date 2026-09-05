import type { Metadata } from "next";
import { Providers } from "./providers";
import "@/styles.css";

export const metadata: Metadata = {
  title: "Quality Dial — AI Call Center Platform",
  description: "Quality Dial unifies CRM, AI voice agents, dialing, campaigns and inbox in one elegant workspace.",
  authors: [{ name: "Quality Dial" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
