import type React from "react";

export function Container({ children }: { children: React.ReactNode }) {
	return <section className="container mx-auto space-y-4">{children}</section>;
}
