import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import z from "zod";
import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { api } from "@/trpc/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 1,
		},
	})
		.input(
			z.object({
				slug: z.string(),
			}),
		)
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req, input }) => {
			// This code runs on your server before upload
			const session = await getSession();

			const article = await db.article.findFirst({
				where: {
					slug: input.slug,
					userId: session?.user.id,
				},
				select: {
					coverImageKey: true,
				},
			});

			console.log("session", session);

			if (!session?.session) throw new UploadThingError("Unauthorized");

			return {
				userId: session.user.id,
				slug: input.slug,
				oldImageKey: article?.coverImageKey,
			};
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("file url", file.ufsUrl);

			if (metadata.oldImageKey) {
				const utapi = new UTApi();
				await utapi.deleteFiles(metadata.oldImageKey);
			}

			try {
				await db.article.update({
					where: {
						slug: metadata.slug,
						userId: metadata.userId,
					},
					data: {
						coverImage: file.ufsUrl,
						coverImageKey: file.key,
						updatedAt: new Date(),
					},
				});
				console.log("Database updated for slug:", metadata.slug);
			} catch (error) {
				console.error("Database update failed:", error);
				throw new UploadThingError("Failed to update article");
			}
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
