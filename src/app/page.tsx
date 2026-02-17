"use client";

import { Container } from "@/components/shared/container";
import PostListHero from "@/components/shared/PostListHero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";

export default function Home() {
	const { data: articles = [] } = api.articles.all.useQuery();
	return (
		<div className="space-y-10">
			<Container>
				<div className="flex h-96 flex-col justify-center gap-4 py-4">
					<div className="max-w-2xl space-y-4">
						<h1 className="font-extrabold text-4xl md:text-5xl">
							Insights and tutorials for modern developers
						</h1>
						<p className="max-w-md text-muted-foreground">
							Practical guides on web development, system design, and software
							engineering.
						</p>

						<div className="space-x-4">
							<Button>Get Started</Button>
							<Button variant={"secondary"}>Read Articles</Button>
						</div>
					</div>
				</div>
			</Container>
			<Separator />

			<Container>
				<PostListHero articles={articles} />
			</Container>
		</div>
	);
}
