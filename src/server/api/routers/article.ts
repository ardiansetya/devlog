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
			orderBy: {
				createdAt: "desc",
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

	getMyArticles: protectedProcedure.query(({ ctx }) => {
		return ctx.db.article.findMany({
			where: {
				userId: ctx.session.user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}),

	create: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1).max(200),
				subtitle: z.string().min(1).max(500),
				excerpt: z.string().min(1).max(1000),
				tag: z.string().min(1).max(50),
				date: z.date(),
				readingTime: z.string(),
				content: z.string().min(1),
				slug: z.string().min(1).max(200),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.article.create({
				data: {
					...input,
					userId: ctx.session.user.id,
				},
			});
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().min(1).max(200),
				subtitle: z.string().min(1).max(500),
				excerpt: z.string().min(1).max(1000),
				tag: z.string().min(1).max(50),
				date: z.date(),
				readingTime: z.string(),
				content: z.string().min(1),
				slug: z.string().min(1).max(200),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			return await ctx.db.article.update({
				where: {
					id,
					userId: ctx.session.user.id,
				},
				data,
			});
		}),

	delete: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.article.delete({
				where: {
					id: input.id,
					userId: ctx.session.user.id,
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
