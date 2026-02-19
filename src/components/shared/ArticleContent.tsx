import { format } from "date-fns";
import Image from "next/image";
import type { RouterOutputs } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MarkdownRenderer from "./MarkdownRenderer";
import RelatedArticles from "./RelatedArticles";

type Articles = RouterOutputs["articles"]["getBySlug"];


const ArticleContent = ({ article }: { article: Articles }) => {
	return (
		<div className="space-y-6">
			<Badge variant={"secondary"}>{article?.tag}</Badge>
			<div className="max-w-3xl">
				<h1 className="font-semibold text-4xl">{article?.title}</h1>
			</div>
			<p className="text-muted-foreground">{article?.subtitle}</p>
			<div className="flex items-center gap-2">
				<Avatar className="size-7">
					<AvatarImage
						alt={article?.user.name}
						src={article?.user.image ?? "https://github.com/shadcn.png"}
					/>
					<AvatarFallback>{article?.user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<p className="font-semibold text-xs">{article?.user.name} | </p>
				<p className="text-muted-foreground text-xs">
					{article?.updatedAt
						? format(new Date(article?.updatedAt), "MMM dd, yyyy")
						: ""}{" "}
					| {article?.readingTime}
				</p>
			</div>
			<Image
				alt={article?.title ?? "cover iamge"}
				className="rounded-xl object-cover"
				height={500}
				src={article?.coverImage ?? "https://placehold.co/600x400/png"}
				width={1000}
			/>
			<article className="prose dark:prose-invert max-w-none">
				<MarkdownRenderer content={article?.content} />
			</article>
			<Separator className="my-12" />
			<div className="flex items-center justify-center">
				<Button variant={"secondary"}>Leave Comment</Button>
			</div>
			<div>
				<Separator className="my-12" />
				<div className="flex items-center gap-2">
					<Avatar className="size-12">
						<AvatarImage
							alt={article?.user.name}
							src={article?.user.image ?? "https://github.com/shadcn.png"}
						/>
						<AvatarFallback>{article?.user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col gap-0.5">
						<p className="p-0 font-semibold">{article?.user.name}</p>
						<p className="text-muted-foreground">{article?.user.email}</p>
					</div>
				</div>
				<Separator className="my-12" />
				<div className="space-y-6">
					<h1 className="font-bold text-xl">Related Articles</h1>
					<RelatedArticles />
				</div>
			</div>
		</div>
	);
};

export default ArticleContent;
