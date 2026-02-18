"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{ label: "Home", to: "/" },
	{ label: "Articles", to: "/articles" },
	{ label: "About", to: "/about" },
];
const Navlink = () => {
	const pathname = usePathname();

	return (
		<nav className="hidden items-center gap-8 md:flex">
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
		</nav>
	);
};

export default Navlink;
