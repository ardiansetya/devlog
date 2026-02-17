import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@/server/api/trpc";

export const articleRouter = createTRPCRouter({
	all: publicProcedure.query(({ ctx }) => {
		return ctx.db.article.findMany({
			include: {
				user: true,
			},
		});
	}),

	getBySlug: publicProcedure
		.input(
			z.object({
				slug: z.string(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.db.article.findFirst({
				where: {
					slug: input.slug,
				},
				include: {
					user: true,
				},
			});
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
					userId: ctx.session.user.id,
				},
				data: {
					coverImage: input.coverImage,
				},
			});
		}),
});
