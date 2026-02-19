"use client";

import { format } from "date-fns";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { DeleteArticleDialog } from "./DeleteArticleDialog";

const DashboardArticles = () => {
	const [deletingArticle, setDeletingArticle] = useState<{
		id: string;
		title: string;
	} | null>(null);

	const { data: articles, isLoading } = api.articles.getMyArticles.useQuery();
	const utils = api.useUtils();

	const handleDeleteSuccess = () => {
		utils.articles.getMyArticles.invalidate();
		setDeletingArticle(null);
	};

	if (isLoading) {
		return <div className="py-10 text-center">Loading...</div>;
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-end">
				<Link href="/dashboard/articles/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						New Article
					</Button>
				</Link>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Tag</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{!articles || articles.length === 0 ? (
							<TableRow>
								<TableCell
									className="text-center text-muted-foreground"
									colSpan={4}
								>
									No articles yet. Create your first one!
								</TableCell>
							</TableRow>
						) : (
							articles.map((article) => (
								<TableRow key={article.id}>
									<TableCell className="font-medium">
										<div>
											<div>{article.title}</div>
											<div className="text-muted-foreground text-xs">
												Slug: {article.slug}
											</div>
										</div>
									</TableCell>
									<TableCell>{article.tag}</TableCell>
									<TableCell>
										{format(article.date, "MMM dd, yyyy")}
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Link href={`/dashboard/articles/${article.id}/edit`}>
												<Button size="sm" variant="outline">
													<Pencil className="h-4 w-4" />
												</Button>
											</Link>
											<Button
												onClick={() =>
													setDeletingArticle({
														id: article.id,
														title: article.title,
													})
												}
												size="sm"
												variant="outline"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{deletingArticle && (
				<DeleteArticleDialog
					articleId={deletingArticle.id}
					articleTitle={deletingArticle.title}
					onOpenChange={(open) => {
						if (!open) {
							setDeletingArticle(null);
						}
					}}
					onSuccess={handleDeleteSuccess}
					open={true}
				/>
			)}
		</div>
	);
};

export default DashboardArticles;
