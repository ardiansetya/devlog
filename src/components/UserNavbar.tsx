"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
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
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleLogin = () => {
		authClient.signIn.social({ provider: "github" });
	};

	const handleLogout = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace("/");
				},
			},
		});
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
								<AvatarImage
									alt={session.user.name}
									src={session.user.image ?? "https://github.com/shadcn.png"}
								/>
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
				<SheetContent
					className="w-72 px-4"
					showCloseButton={false}
					side="right"
				>
					<SheetHeader className="border-b pb-4">
						<SheetTitle className="flex items-center gap-3">
							<Avatar className="h-10 w-10">
								{session?.user.image ? (
									<AvatarImage
										alt={session.user.name}
										src={session.user.image}
									/>
								) : null}
								<AvatarFallback className="bg-primary text-primary-foreground">
									{session?.user.name?.charAt(0).toUpperCase() ?? "U"}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="font-semibold">
									{session?.user.name ?? "User"}
								</span>
								<span className="text-muted-foreground text-sm">
									{session?.user.email}
								</span>
							</div>
						</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col gap-2">
						{navLinks.map((link) => (
							<Button
								asChild
								className="justify-start"
								key={link.to}
								onClick={() => setMobileOpen(false)}
								variant={pathname === link.to ? "secondary" : "ghost"}
							>
								<Link href={link.to}>{link.label}</Link>
							</Button>
						))}

						{session?.session && (
							<>
								<Separator className="my-2" />
								<Button
									asChild
									className="justify-start"
									onClick={() => setMobileOpen(false)}
									variant="ghost"
								>
									<Link href="/profile">Profile</Link>
								</Button>
								<Button
									asChild
									className="justify-start"
									onClick={() => setMobileOpen(false)}
									variant="ghost"
								>
									<Link href="/dashboard">Dashboard</Link>
								</Button>
								<Separator className="my-2" />
								<Button
									className="justify-start bg-destructive/30 hover:bg-destructive/40"
									onClick={() => {
										handleLogout();
										setMobileOpen(false);
									}}
									variant="ghost"
								>
									Log out
								</Button>
							</>
						)}

						{!session?.session && (
							<Button className="mt-4" onClick={handleLogin}>
								Login
							</Button>
						)}

						<div className="mt-auto pt-4">
							<ModeToggle />
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserNavbar;
