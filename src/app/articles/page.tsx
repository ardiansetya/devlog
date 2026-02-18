import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import FeaturedArticles from "@/components/shared/FeaturedArticles";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
	title: "Devlog | Articles",
	description: "Devlog - Insights for modern developers.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = async () => {
	const articles = await api.articles.all();

	return (
		<main className="flex min-h-[calc(100vh-64px)] items-center px-4 py-8 md:py-8">
			<Container>
				<div className="space-y-2 pb-4">
					<h1 className="font-bold text-4xl">Articles</h1>
					<p className="text-muted-foreground">
						All posts on web development, system design, and software
						engineering.
					</p>
				</div>
				<FeaturedArticles articles={articles} />
			</Container>
		</main>
	);
};

export default page;
