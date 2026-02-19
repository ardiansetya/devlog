"use client";

import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Code,
	Highlighter,
	Image as ImageIcon,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Quote,
	Redo,
	Strikethrough,
	Underline as UnderlineIcon,
	Undo,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EditorProps {
	content: string;
	onChange: (content: string) => void;
}

export const TiptapEditor = ({ content, onChange }: EditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Underline,
			Image.configure({
				HTMLAttributes: {
					class: "rounded-lg max-w-full",
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: "text-primary underline",
				},
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Highlight,
			Color,
			CharacterCount.configure({
				limit: 10000,
			}),
			Markdown,
		],
		immediatelyRender: false,
		content,
		onUpdate: ({ editor }) => {
			const markdown = editor.getMarkdown();
			onChange(markdown);
		},
	});

	useEffect(() => {
		if (editor && content !== editor.getMarkdown()) {
			editor.commands.setContent(content, { emitUpdate: false });
		}
	}, [content, editor]);

	if (!editor) {
		return null;
	}

	const addLink = () => {
		const url = window.prompt("Enter the URL");
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	const addImage = () => {
		const url = window.prompt("Enter the image URL");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div className="overflow-hidden rounded-lg border">
			<div className="flex flex-wrap gap-1 border-b bg-muted/50 p-2">
				<div className="flex items-center gap-1 border-r pr-2">
					<Button
						className="h-8 w-8"
						disabled={!editor.can().chain().focus().toggleBold().run()}
						onClick={() => editor.chain().focus().toggleBold().run()}
						size="icon"
						variant={editor.isActive("bold") ? "secondary" : "ghost"}
					>
						<Bold className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						onClick={() => editor.chain().focus().toggleItalic().run()}
						size="icon"
						variant={editor.isActive("italic") ? "secondary" : "ghost"}
					>
						<Italic className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						size="icon"
						variant={editor.isActive("underline") ? "secondary" : "ghost"}
					>
						<UnderlineIcon className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleStrike().run()}
						size="icon"
						variant={editor.isActive("strike") ? "secondary" : "ghost"}
					>
						<Strikethrough className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center gap-1 border-r px-2">
					<Button
						className="h-8 w-8 font-bold text-sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						size="icon"
						variant={
							editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
						}
					>
						H1
					</Button>
					<Button
						className="h-8 w-8 font-bold text-sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						size="icon"
						variant={
							editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
						}
					>
						H2
					</Button>
					<Button
						className="h-8 w-8 font-bold text-sm"
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						size="icon"
						variant={
							editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
						}
					>
						H3
					</Button>
				</div>

				<div className="flex items-center gap-1 border-r px-2">
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						size="icon"
						variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
					>
						<List className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						size="icon"
						variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
					>
						<ListOrdered className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center gap-1 border-r px-2">
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						size="icon"
						variant={
							editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"
						}
					>
						<AlignLeft className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						size="icon"
						variant={
							editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"
						}
					>
						<AlignCenter className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						size="icon"
						variant={
							editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"
						}
					>
						<AlignRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center gap-1 border-r px-2">
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						size="icon"
						variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
					>
						<Code className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						size="icon"
						variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
					>
						<Quote className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						onClick={() => editor.chain().focus().toggleHighlight().run()}
						size="icon"
						variant={editor.isActive("highlight") ? "secondary" : "ghost"}
					>
						<Highlighter className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center gap-1 px-2">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="h-8 w-8"
								size="icon"
								variant={editor.isActive("link") ? "secondary" : "ghost"}
							>
								<LinkIcon className="h-4 w-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 p-3">
							<div className="flex gap-2">
								<Input
									className="flex-1"
									defaultValue={editor.getAttributes("link").href}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											editor
												.chain()
												.focus()
												.setLink({ href: e.currentTarget.value })
												.run();
										}
									}}
									placeholder="Enter URL..."
								/>
								<Button
									onClick={() => {
										const input = document.querySelector(
											'input[placeholder="Enter URL..."]',
										) as HTMLInputElement;
										if (input) {
											editor
												.chain()
												.focus()
												.setLink({ href: input.value })
												.run();
										}
									}}
									size="sm"
								>
									Set
								</Button>
								<Button
									onClick={() => editor.chain().focus().unsetLink().run()}
									size="sm"
									variant="outline"
								>
									Remove
								</Button>
							</div>
						</PopoverContent>
					</Popover>

					<Button
						className="h-8 w-8"
						onClick={addImage}
						size="icon"
						variant="ghost"
					>
						<ImageIcon className="h-4 w-4" />
					</Button>
				</div>

				<div className="ml-auto flex items-center gap-1 border-l pl-2">
					<Button
						className="h-8 w-8"
						disabled={!editor.can().chain().focus().undo().run()}
						onClick={() => editor.chain().focus().undo().run()}
						size="icon"
						variant="ghost"
					>
						<Undo className="h-4 w-4" />
					</Button>
					<Button
						className="h-8 w-8"
						disabled={!editor.can().chain().focus().redo().run()}
						onClick={() => editor.chain().focus().redo().run()}
						size="icon"
						variant="ghost"
					>
						<Redo className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<EditorContent
				className={cn(
					"prose dark:prose-invert min-h-[400px] max-w-none p-4 focus:outline-none",
					"prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
					"prose-ol:my-2 prose-p:my-2 prose-ul:my-2",
					"prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:pl-4 prose-blockquote:italic",
					"prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm",
					"prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4",
					"prose-img:my-4 prose-img:rounded-lg",
					"prose-a:text-primary prose-a:underline",
				)}
				editor={editor}
			/>
		</div>
	);
};
