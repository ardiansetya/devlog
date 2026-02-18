import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { RouterOutputs } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

type Articles = RouterOutputs["articles"]["all"];

const LatestArticles = ({
	articles,
	isLoading,
	isError,
}: {
	articles: Articles | null;
	isLoading?: boolean;
	isError?: boolean;
}) => {
	if (isLoading) {
		return (
			<div className="py-10 text-center">
				<Spinner className="size-8" />
			</div>
		);
	}
	if (isError) {
		return (
			<div className="py-10 text-center text-destructive">
				Something went wrong
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{articles?.map((article) => (
				<Link
					className="group space-y-4"
					href={`/articles/${article.slug}`}
					key={article.id}
				>
					<div className="mt-4 space-y-1">
						<Badge variant="secondary">{article.tag}</Badge>
						<h1 className="font-bold text-2xl transition-all duration-300 group-hover:text-muted-foreground">
							{article.title}
						</h1>
					</div>
					<p className="text-muted-foreground">{article.subtitle}</p>
					<div className="flex items-center gap-2">
						<Avatar className="size-7">
							<AvatarImage
								alt={article.user.name}
								src={article.user.image ?? ""}
							/>
							<AvatarFallback>{article.userId}</AvatarFallback>
						</Avatar>
						<p className="font-semibold text-xs">
							{article.user.name} | {format(article.createdAt, "MMM dd, yyyy")}
						</p>
					</div>
					<Separator />
				</Link>
			))}
		</div>
	);
};

export default LatestArticles;
