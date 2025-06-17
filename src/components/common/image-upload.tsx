"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);
    toast.error("Image uploaded failed");
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uploaded successfully");
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName=""
      />

      <Button
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md"
      >
        <UploadIcon height={20} width={20} />
        <p className="text-base">Upload a File</p>
        {file && <p className="mt-1 text-center text-xs">{file.filePath}</p>}
      </Button>

      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          height={500}
          width={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
