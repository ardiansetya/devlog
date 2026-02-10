"use client";

import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function MultiUploader() {
  const { slug } = useParams<{ slug: string }>();
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
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
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      console.log(acceptedFiles);
    },
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <div className="flex flex-col items-center gap-y-4 border border-dashed max-w-2xl p-6" {...getRootProps()}>
      <input {...getInputProps()} />
      {!preview ? (
        <div className="text-center space-y-2">
          <div className="text-muted-foreground text-sm">
            Drag & drop image here
          </div>

          <div className="text-xs text-muted-foreground">
            atau klik untuk memilih file
          </div>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {/* PREVIEW IMAGE */}
          <div className="relative w-full overflow-hidden rounded-lg border bg-muted">
            <img
              src={preview}
              alt="preview"
              className="
                w-full
                max-h-[320px]
                object-cover
                transition
              "
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
      <Progress className="w-1/4  " value={progress} />
    </div>
  );
}
