import "@tiptap/core";
import type { MarkdownManager } from "@tiptap/markdown";

declare module "@tiptap/core" {
	interface Editor {
		getMarkdown: () => string;
		markdown?: MarkdownManager;
	}
}

export {};
