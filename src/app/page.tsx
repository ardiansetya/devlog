"use client";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";

import coverFallback from "../../public/images/article-cover-1.jpg";

export default function Home() {
  const data = api.articles.all.useQuery();
  return (
    <>
      <Container>
        <div className="flex py-4 flex-col  gap-4 h-96 justify-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="font-extrabold text-4xl md:text-5xl">
              Insights and tutorials for modern developers
            </h1>
            <p className="text-muted-foreground max-w-md">
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
        {data.data?.map((article) => (
          
          <div key={article.id}>
            <Link
              href={`/upload/${article.slug}`}
              className="text-3xl font-bold "
            >
              {article.title}
            </Link>
            <Image
              src={article.coverImage ?? coverFallback}
              alt={article.title}
              width={100}
              height={100}
            />
            <p>{article.content}</p>
          </div>
        ))}
      </Container>
    </>
  );
}
