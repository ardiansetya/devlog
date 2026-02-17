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

type Articles = RouterOutputs["articles"]["all"];

const PostListHero = ({ articles }: { articles: Articles | null }) => {
	if (!articles || articles.length === 0) {
		return (
			<div className="py-10 text-center text-muted-foreground">
				No articles available.
			</div>
		);
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{articles.map((article) => (
				<Link href={`/upload/${article.slug}`} key={article.id}>
					<Card className="group flex flex-col justify-between pt-0 transition-shadow duration-300 hover:shadow-lg">
						<CardHeader className="p-0">
							<Image
								alt={article.title}
								className="rounded-t-xl object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-50"
								height={500}
								src={article.coverImage ?? ""}
								width={500}
							/>
						</CardHeader>

						<CardContent className="space-y-4">
							<CardTitle className="line-clamp-2">{article.title}</CardTitle>
							<CardDescription className="line-clamp-3">
								{article.excerpt}
							</CardDescription>
						</CardContent>

						<CardFooter className="flex items-center gap-3 text-muted-foreground text-xs">
							<Avatar className="size-8">
								<AvatarImage
									alt={article.user.name}
									src={article.user.image ?? ""}
								/>
								<AvatarFallback>{article.userId}</AvatarFallback>
							</Avatar>
							<div>
								<p className="font-bold">
									{article.user.name} |{" "}
									{format(article.createdAt, "MMM dd, yyyy")}
								</p>
							</div>
						</CardFooter>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default PostListHero;
