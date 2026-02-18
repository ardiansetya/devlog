"use client";

import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string | undefined }) => {
	return (
		<ReactMarkdown rehypePlugins={[rehypeSanitize]} remarkPlugins={[remarkGfm]}>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
