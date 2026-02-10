import { getSession } from "@/server/better-auth/server";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import z from "zod";

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

      console.log("session", session);

      // If you throw, the user will not be able to upload
      if (!session?.session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id, slug: input.slug };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.ufsUrl);

      await db.article.update({
        where: {
          slug: metadata.slug,
          userId: metadata.userId,
        },
        data: {
          coverImage: file.ufsUrl,
        },
      })

      


      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
