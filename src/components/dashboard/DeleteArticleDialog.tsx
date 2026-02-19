"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";

interface DeleteArticleDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess: () => void;
	articleId: string;
	articleTitle: string;
}

export const DeleteArticleDialog = ({
	open,
	onOpenChange,
	onSuccess,
	articleId,
	articleTitle,
}: DeleteArticleDialogProps) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const utils = api.useUtils();

	const deleteMutation = api.articles.delete.useMutation({
		onMutate: () => {
			setIsDeleting(true);
		},
		onSuccess: () => {
			toast.success("Article deleted successfully");
			utils.articles.getMyArticles.invalidate();
			onSuccess();
			onOpenChange(false);
		},
		onError: (error) => {
			toast.error(`Failed to delete article: ${error.message}`);
		},
		onSettled: () => {
			setIsDeleting(false);
		},
	});

	const handleDelete = () => {
		deleteMutation.mutate({ id: articleId });
	};

	return (
		<AlertDialog onOpenChange={onOpenChange} open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						article &quot;{articleTitle}&quot;.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						disabled={isDeleting}
						onClick={handleDelete}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
