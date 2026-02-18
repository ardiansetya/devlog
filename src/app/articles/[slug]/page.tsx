import type { Metadata } from "next";
import ArticleContent from "@/components/shared/ArticleContent";
import { Container } from "@/components/shared/container";
import { api } from "@/trpc/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = await api.articles.getBySlug({
		slug,
	});

	if (!article) {
		return {
			title: "Article Not Found | Devlog",
		};
	}

	return {
		title: `${article.title} | Devlog`,
		description: article.excerpt,
		keywords: [article.tag, "devlog", "software engineering"],
		openGraph: {
			title: article.title,
			description: article.excerpt,
			type: "article",
			url: `http://localhost:3000/articles/${article.slug}`,
			images: article.coverImage
				? [
						{
							url: article.coverImage,
							width: 1200,
							height: 630,
							alt: article.title,
						},
					]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.excerpt,
			images: article.coverImage ? [article.coverImage] : [],
		},
	};
}

const page = async ({
	params,
}: {
	params: Promise<{
		slug: string;
	}>;
}) => {
	const { slug } = await params;
	const data = await api.articles.getBySlug({ slug });
	return (
		<main className="flex min-h-[calc(100vh-64px)] px-4 py-18">
			<div className="flex w-full gap-4">
				<Container>
					<div className="flex gap-12">
						<div className="w-full md:w-4/5">
							<ArticleContent article={data} />
						</div>
						<div className="hidden md:flex md:w-1/5">
							<h1>TOC</h1>
						</div>
					</div>
				</Container>
			</div>
		</main>
	);
};

export default page;
