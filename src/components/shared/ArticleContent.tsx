import { format } from "date-fns";
import Image from "next/image";
import type { RouterOutputs } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import MarkdownRenderer from "./MarkdownRenderer";

type Articles = RouterOutputs["articles"]["getBySlug"];

const ArticleContent = ({ article }: { article: Articles }) => {
	return (
		<div className="prose dark:prose-invert max-w-none space-y-4">
			<Badge variant={"secondary"}>{article?.tag}</Badge>
			<div className="max-w-3xl">
				<h1 className="font-semibold text-4xl">{article?.title}</h1>
			</div>
			<p className="text-muted-foreground">{article?.subtitle}</p>
			<div className="flex items-center gap-2">
				<Avatar className="size-7">
					<AvatarImage
						alt={article?.user.name}
						src={article?.user.image ?? ""}
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
			<article className="prose dark:prose-invert max-w-none">
				<Image
					alt={article?.title ?? "cover iamge"}
					className="rounded-xl object-cover"
					height={500}
					src={article?.coverImage ?? ""}
					width={1000}
				/>
				<MarkdownRenderer content={article?.content} />
			</article>
		</div>
	);
};

export default ArticleContent;
