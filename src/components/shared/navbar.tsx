"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/server/better-auth/client";
import { ModeToggle } from "./toggle-theme";

const navLinks = [
	{ label: "Home", to: "/" },
	{ label: "Articles", to: "/articles" },
	{ label: "About", to: "/about" },
];

export function Navbar() {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const session = authClient.useSession();

	const handleLogin = () => {
		authClient.signIn.social({ provider: "github" });
	};

	const handleLogout = () => {
		authClient.signOut();
	};

	return (
		<header className="sticky top-0 z-50 mx-auto px-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				{/* Left: Logo */}
				<Link className="font-semibold text-lg tracking-tight" href="/">
					devlog<span className="text-muted-foreground">.</span>
				</Link>

				{/* Center: Nav links (desktop) */}
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

				{/* Right: Actions */}
				<div className="flex items-center gap-2">
					{!session.data ? (
						<Button className="hidden md:flex" onClick={handleLogin} size="sm">
							Login
						</Button>
					) : (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="hidden md:flex" size="icon" variant="ghost">
									<Avatar className="h-7 w-7">
										<AvatarFallback className="bg-muted text-muted-foreground text-xs">
											U
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48 bg-popover">
								<DropdownMenuItem asChild>
									<Link href="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/dashboard">Dashboard</Link>
								</DropdownMenuItem>

								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}

					<div className="hidden md:flex">
						<ModeToggle />
					</div>

					{/* Mobile hamburger */}
					<Sheet onOpenChange={setMobileOpen} open={mobileOpen}>
						<SheetTrigger asChild>
							<Button className="md:hidden" size="icon" variant="ghost">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent className="w-72 px-4" side="right">
							<nav className="mt-8 flex flex-col gap-6">
								{navLinks.map((link) => (
									<Link
										className={`text-lg transition-colors ${
											pathname === link.to
												? "font-medium text-foreground"
												: "text-muted-foreground"
										}`}
										href={link.to}
										key={link.to}
										onClick={() => setMobileOpen(false)}
									>
										{link.label}
									</Link>
								))}
								<Button className="mt-4" onClick={handleLogin}>
									Login
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
