import { redirect } from "next/navigation";
import { Container } from "@/components/shared/container";
import { ArticleForm } from "@/components/tiptap/ArticleForm";
import { getSession } from "@/server/better-auth/server";

export const metadata = {
	title: "Create Article | Dashboard | Devlog",
	description: "Create a new article",
};

const CreateArticlePage = async () => {
	const session = await getSession();

	if (!session?.session) {
		redirect("/");
	}

	return (
		<main className="min-h-[calc(100vh-64px)] px-4 py-8">
			<Container>
				<div className="mb-8 space-y-1">
					<h1 className="font-bold text-3xl">Create Article</h1>
					<p className="text-muted-foreground">
						Write and publish a new article
					</p>
				</div>
				<ArticleForm />
			</Container>
		</main>
	);
};

export default CreateArticlePage;
