import { redirect } from "next/navigation";
import { Container } from "@/components/shared/container";
import DashboardArticles from "@/components/dashboard/DashboardArticles";
import { getSession } from "@/server/better-auth/server";

export const metadata = {
	title: "Dashboard | Devlog",
	description: "Manage your articles",
};

const DashboardPage = async () => {
	const session = await getSession();

	if (!session?.session) {
		redirect("/");
	}

	return (
		<main className="min-h-[calc(100vh-64px)] px-4 py-8">
			<Container>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<h1 className="font-bold text-3xl">Dashboard</h1>
						<p className="text-muted-foreground">
							Manage your articles and content
						</p>
					</div>
				</div>
				<div className="mt-8">
					<DashboardArticles />
				</div>
			</Container>
		</main>
	);
};

export default DashboardPage;
