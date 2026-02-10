import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const articleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.article.findMany();
  }),

  updateCoverImage: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        coverImage: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.article.update({
        where: {
          slug: input.slug,
          userId:   ctx.session.user.id
        },
        data: {
          coverImage: input.coverImage,
        },
      });
    }),
});
