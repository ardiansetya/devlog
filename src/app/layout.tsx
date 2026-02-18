import "@/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
	title: "Devlog",
	description: "Devlog - Insights for modern developers.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en" suppressHydrationWarning>
			<body className="flex min-h-dvh flex-col">
				<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<TRPCReactProvider>
						<Navbar />

						<main className="flex-1">{children}</main>
						<Footer />
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
