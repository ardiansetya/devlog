"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const navLinks = [
	{ label: "Home", to: "/" },
	{ label: "Articles", to: "/articles" },
	{ label: "About", to: "/about" },
];

const Footer = () => {
	const pathname = usePathname();
	return (
		<div className="mt-8 space-y-8 border-t px-8 py-12">
			<div className="space-y-4 text-center sm:flex sm:items-center sm:justify-between sm:text-start">
				<div>
					<h1 className="font-bold text-xl">Devlog</h1>
					<p className="text-muted-foreground">
						Insights for modern developers.
					</p>
				</div>
				<div className="space-x-4">
					{navLinks.map((link) => (
						<Link
							className={`text-sm transition-colors hover:text-foreground ${
								pathname === link.to
									? "font-medium text-foreground"
									: "text-muted-foreground"
							}`}
							href={link.to}
							key={link.to}
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
			<Separator />
			<div>
				<p className="text-muted-foreground text-sm">
					&copy; 2026 Devlog. All rights reserved
				</p>
			</div>
		</div>
	);
};

export default Footer;
