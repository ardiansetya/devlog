import Link from "next/link";
import { getServerSession } from "@/lib/serverSession";
import Navlink from "./Navlink";
import UserNavbar from "./UserNavbar";

export async function Navbar() {
	const session = await getServerSession();

	return (
		<header className="sticky top-0 z-50 mx-auto w-full border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				{/* Left: Logo */}
				<Link className="font-semibold text-lg tracking-tight" href="/">
					devlog<span className="text-muted-foreground">.</span>
				</Link>

				{/* Center: Nav links (desktop) */}
				<Navlink />

				{/* Right: Actions */}
				<UserNavbar session={session} />
			</div>
		</header>
	);
}
