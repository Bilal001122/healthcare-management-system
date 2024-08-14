"use client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader({
  files,
  onChange,
}: {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border border-dashed border-inputBorder py-5 rounded-md bg-input gap-2 cursor-pointer"
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={100}
          height={100}
          alt="uploaded image"
          className="object-cover"
        />
      ) : (
        <>
          <Image
            src={"/assets/icons/upload.svg"}
            width={40}
            height={40}
            alt="upload"
            className="mr-2"
          />
          <div className="flex flex-col items-center">
            <p className="text-foreground/50">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-foreground/50">SVG, PNG, JPG, GIF, WEBP</p>
          </div>
        </>
      )}
    </div>
  );
}
