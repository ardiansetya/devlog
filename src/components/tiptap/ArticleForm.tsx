"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TiptapEditor } from "@/components/tiptap/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import Link from "next/link";

const articleSchema = z.object({
	title: z.string().min(1, "Title is required").max(200),
	subtitle: z.string().min(1, "Subtitle is required").max(500),
	excerpt: z.string().min(1, "Excerpt is required").max(1000),
	tag: z.string().min(1, "Tag is required").max(50),
	date: z.date(),
	readingTime: z.string().min(1, "Reading time is required"),
	content: z.string().min(1, "Content is required"),
	slug: z.string().min(1, "Slug is required").max(200),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
	article?: {
		id: string;
		title: string;
		subtitle: string;
		excerpt: string;
		tag: string;
		date: Date;
		readingTime: string;
		content: string;
		slug: string;
	} | null;
}

export const ArticleForm = ({ article }: ArticleFormProps) => {
	const isEditing = !!article;

	const form = useForm<ArticleFormData>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: article?.title ?? "",
			subtitle: article?.subtitle ?? "",
			excerpt: article?.excerpt ?? "",
			tag: article?.tag ?? "",
			date: article?.date ?? new Date(),
			readingTime: article?.readingTime ?? "",
			content: article?.content ?? "",
			slug: article?.slug ?? "",
		},
	});

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const utils = api.useUtils();

	const createMutation = api.articles.create.useMutation({
		onSuccess: () => {
			toast.success("Article created successfully");
			form.reset();
			utils.articles.getMyArticles.invalidate();
		},
		onError: (error) => {
			toast.error(`Failed to create article: ${error.message}`);
		},
	});

	const updateMutation = api.articles.update.useMutation({
		onSuccess: () => {
			toast.success("Article updated successfully");
			utils.articles.getMyArticles.invalidate();
		},
		onError: (error) => {
			toast.error(`Failed to update article: ${error.message}`);
		},
	});

	const onSubmit = (data: ArticleFormData) => {
		if (isEditing && article) {
			updateMutation.mutate({
				id: article.id,
				...data,
			});
		} else {
			createMutation.mutate(data);
		}
		console.log(data)
	};

	const isSubmitting = createMutation.isPending || updateMutation.isPending;

	return (
		<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
			<div className="grid gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="title">Title</Label>
						<Input
							{...form.register("title")}
							id="title"
							placeholder="Enter article title"
						/>
						{form.formState.errors.title && (
							<p className="text-destructive text-xs">
								{form.formState.errors.title.message}
							</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="slug">Slug</Label>
						<Input
							{...form.register("slug")}
							id="slug"
							placeholder="my-article-slug"
						/>
						{form.formState.errors.slug && (
							<p className="text-destructive text-xs">
								{form.formState.errors.slug.message}
							</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="subtitle">Subtitle</Label>
						<Input
							{...form.register("subtitle")}
							id="subtitle"
							placeholder="Brief subtitle"
						/>
						{form.formState.errors.subtitle && (
							<p className="text-destructive text-xs">
								{form.formState.errors.subtitle.message}
							</p>
						)}
					</div>
				</div>

				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="tag">Tag</Label>
						<Input
							{...form.register("tag")}
							id="tag"
							placeholder="e.g., React, TypeScript"
						/>
						{form.formState.errors.tag && (
							<p className="text-destructive text-xs">
								{form.formState.errors.tag.message}
							</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label htmlFor="readingTime">Reading Time</Label>
						<Input
							{...form.register("readingTime")}
							id="readingTime"
							placeholder="e.g., 5 min read"
						/>
						{form.formState.errors.readingTime && (
							<p className="text-destructive text-xs">
								{form.formState.errors.readingTime.message}
							</p>
						)}
					</div>

					<div className="grid gap-2">
						<Label>Date</Label>
						<Popover onOpenChange={setIsCalendarOpen} open={isCalendarOpen}>
							<PopoverTrigger asChild>
								<Button
									className={cn(
										"w-full justify-start text-left font-normal",
										!form.watch("date") && "text-muted-foreground",
									)}
									id="date"
									variant="outline"
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{form.watch("date") ? (
										format(form.watch("date"), "PPP")
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent align="start" className="w-auto p-0">
								<Calendar
									autoFocus
									mode="single"
									onSelect={(date: Date | undefined) => {
										if (date) {
											form.setValue("date", date);
											setIsCalendarOpen(false);
										}
									}}
									selected={form.watch("date")}
								/>
							</PopoverContent>
						</Popover>
						{form.formState.errors.date && (
							<p className="text-destructive text-xs">
								{form.formState.errors.date.message}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="excerpt">Excerpt</Label>
				<Textarea
					{...form.register("excerpt")}
					className="resize-none"
					id="excerpt"
					placeholder="Short description for previews"
					rows={3}
				/>
				{form.formState.errors.excerpt && (
					<p className="text-destructive text-xs">
						{form.formState.errors.excerpt.message}
					</p>
				)}
			</div>

			<div className="grid gap-2">
				<Label>Content</Label>
				<TiptapEditor
					content={form.watch("content")}
					onChange={(content) => form.setValue("content", content)}
				/>
				{form.formState.errors.content && (
					<p className="text-destructive text-xs">
						{form.formState.errors.content.message}
					</p>
				)}
			</div>

			<div className="flex gap-4">
				<Link href="/dashboard">
					<Button type="button" variant="outline">
						Cancel
					</Button>
				</Link>
				<Button disabled={isSubmitting} type="submit">
					{isSubmitting
						? isEditing
							? "Updating..."
							: "Creating..."
						: isEditing
							? "Update Article"
							: "Create Article"}
				</Button>
			</div>
		</form>
	);
};
