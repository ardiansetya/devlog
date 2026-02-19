import { redirect } from "next/navigation";
import { Container } from "@/components/shared/container";
import { ArticleForm } from "@/components/tiptap/ArticleForm";
import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";

export const metadata = {
	title: "Edit Article | Dashboard | Devlog",
	description: "Edit your article",
};

const EditArticlePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const session = await getSession();
	const { id } = await params;

	if (!session?.session) {
		redirect("/");
	}

	const article = await db.article.findFirst({
		where: {
			id,
			userId: session.user.id,
		},
	});

	if (!article) {
		redirect("/dashboard");
	}

	return (
		<main className="min-h-[calc(100vh-64px)] px-4 py-8">
			<Container>
				<div className="mb-8 space-y-1">
					<h1 className="font-bold text-3xl">Edit Article</h1>
					<p className="text-muted-foreground">
						Update your article content
					</p>
				</div>
				<ArticleForm
					article={{
						id: article.id,
						title: article.title,
						subtitle: article.subtitle,
						excerpt: article.excerpt,
						tag: article.tag,
						date: article.date,
						readingTime: article.readingTime,
						content: article.content,
						slug: article.slug,
					}}
				/>
			</Container>
		</main>
	);
};

export default EditArticlePage;
