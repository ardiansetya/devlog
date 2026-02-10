import { db } from "@/server/db";
import { PrismaClient } from "@prisma/client";

async function main() {
  await db.article.createMany({
    data: [
      {
        slug: "building-scalable-apis-with-edge-functions",
        title: "Building Scalable APIs with Edge Functions",
        subtitle:
          "How serverless edge computing is changing the way we build backends",
        excerpt:
          "Explore the architecture patterns behind modern edge-first API design and learn how to deploy globally distributed endpoints.",
        tag: "System Design",
        userId: "gYrciRd9EsUfV8ySMLbmre2fGdlR6l79",
        date: new Date("2026-02-05"),
        readingTime: "8 min read",
        content: `
## The Rise of Edge Computing

The traditional model of centralized servers is giving way to a distributed approach. Edge functions execute code closer to your users, reducing latency and improving the overall experience.

Modern platforms now allow developers to deploy functions that run in data centers worldwide, automatically routing requests to the nearest location.
        `,
      },
      {
        slug: "typescript-patterns-you-should-know",
        title: "TypeScript Patterns You Should Know in 2026",
        subtitle: "Advanced type-level programming for real-world applications",
        excerpt:
          "Deep dive into discriminated unions, branded types, and template literal types that will level up your TypeScript code.",
        tag: "TypeScript",
        userId: "gYrciRd9EsUfV8ySMLbmre2fGdlR6l79",
        date: new Date("2026-01-28"),
        readingTime: "12 min read",
        coverImage: "/articles/article-cover-2.jpg",
        content: `
## Beyond Basic Types

TypeScript has evolved far beyond simple type annotations. Modern TypeScript allows you to encode complex business rules directly in your type system, catching errors at compile time rather than runtime.
        `,
      },
      {
        slug: "designing-resilient-distributed-systems",
        title: "Designing Resilient Distributed Systems",
        subtitle:
          "Lessons from building systems that handle millions of requests",
        excerpt:
          "Learn the fundamental patterns for building fault-tolerant distributed systems that gracefully handle failure.",
        tag: "Architecture",
        userId: "gYrciRd9EsUfV8ySMLbmre2fGdlR6l79",
        date: new Date("2026-01-15"),
        readingTime: "10 min read",
        coverImage: "/articles/article-cover-3.jpg",
        content: `
## Embracing Failure

In distributed systems, failure isn't an edge case — it's the norm. Networks partition, services crash, and disks fail.
        `,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Article seeding completed");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
