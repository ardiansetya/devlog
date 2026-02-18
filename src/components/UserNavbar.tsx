"use client";

import { MenuIcon } from "lucide-react";
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
import type { Session } from "@/server/better-auth/config";
import { ModeToggle } from "./shared/toggle-theme";

const navLinks = [
	{ label: "Home", to: "/" },
	{ label: "Articles", to: "/articles" },
	{ label: "About", to: "/about" },
];

const UserNavbar = ({ session }: { session: Session | null }) => {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleLogin = () => {
		authClient.signIn.social({ provider: "github" });
	};

	const handleLogout = () => {
		authClient.signOut();
	};

	return (
		<div className="flex items-center gap-2">
			{!session?.session ? (
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
						<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
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
						<MenuIcon className="h-5 w-5" />
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
	);
};

export default UserNavbar;
