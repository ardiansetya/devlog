"use client";

import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
	generateClientDropzoneAccept,
	generatePermittedFileTypes,
} from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { api } from "@/trpc/react";
import { useUploadThing } from "@/utils/uploadthing";

export default function MultiUploader() {
	const { slug } = useParams<{ slug: string }>();
	const [files, setFiles] = useState<File[]>([]);
	const [preview, setPreview] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);

	const utils = api.useUtils();

	const { startUpload, routeConfig } = useUploadThing("imageUploader", {
		onClientUploadComplete: () => {
			utils.articles.getBySlug.invalidate({ slug });
			alert("uploaded successfully!");
		},
		onUploadError: () => {
			alert("error occurred while uploading");
		},
		onUploadBegin: () => {
			alert("upload started");
		},
		onUploadProgress: setProgress,
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			setFiles(acceptedFiles);
			if (acceptedFiles[0]) {
				setPreview(URL.createObjectURL(acceptedFiles[0]));
			}
			console.log(acceptedFiles);
		},
		accept: generateClientDropzoneAccept(
			generatePermittedFileTypes(routeConfig).fileTypes,
		),
	});

	return (
		<div
			className="flex max-w-2xl flex-col items-center gap-y-4 border border-dashed p-6"
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{!preview ? (
				<div className="space-y-2 text-center">
					<div className="text-muted-foreground text-sm">
						Drag & drop image here
					</div>

					<div className="text-muted-foreground text-xs">
						atau klik untuk memilih file
					</div>
				</div>
			) : (
				<div className="w-full space-y-4">
					{/* PREVIEW IMAGE */}
					<div className="relative w-full overflow-hidden rounded-lg border bg-muted">
						<img
							alt="preview"
							className="max-h-[320px] w-full object-cover transition"
							src={preview}
						/>
					</div>
				</div>
			)}
			{files.length > 0 && (
				<Button
					disabled={progress > 0}
					onClick={() => startUpload(files, { slug })}
				>
					Upload {files.length} files
				</Button>
			)}
			<Progress className="w-1/4" value={progress} />
		</div>
	);
}
