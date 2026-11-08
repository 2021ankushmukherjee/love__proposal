import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const metadata: Metadata = { title: "For Pratitee ❤️", description: "A little something from my heart.", robots: { index: false, follow: false }, icons: { icon: `${basePath}/favicon.svg` } };
export const viewport: Viewport = { themeColor: "#fff5f1", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
