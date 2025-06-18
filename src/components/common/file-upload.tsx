"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import { UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

/**
 * ImageKit authenticator function
 * Fetches authentication parameters from API
 */
const authenticator = async () => {
  try {
    // Always use the current origin for API calls in development
    const apiUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : config.env.apiEndpoint;

    console.log("Using API URL:", apiUrl); // Debug log

    const response = await fetch(`${apiUrl}/api/auth/imagekit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add credentials for same-origin requests
      credentials: "same-origin",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ImageKit auth response error:", errorText);
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    if (!signature || !expire || !token) {
      throw new Error("Invalid authentication response from server");
    }

    console.log("ImageKit auth successful"); // Debug log

    return { token, expire, signature };
  } catch (error: any) {
    console.error("ImageKit authentication error:", error);

    // Show user-friendly error message
    toast.error(
      "Không thể kết nối đến dịch vụ tải file. Vui lòng thử lại sau."
    );

    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface FileUploadProps {
  type: "image" | "video" | "file";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
  disabled?: boolean;
}

/**
 * File upload component using ImageKit
 * Supports images, videos, and other file types
 */
const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
  disabled = false,
}: FileUploadProps) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const styles = {
    button:
      variant === "dark"
        ? "bg-muted border-muted"
        : "bg-background border-input",
    placeholder:
      variant === "dark" ? "text-muted-foreground" : "text-muted-foreground",
    text: variant === "dark" ? "text-foreground" : "text-foreground",
  };

  const onError = (error: any) => {
    console.error("Upload error:", error);
    setIsUploading(false);
    setProgress(0);
    toast.error(
      `Không thể tải lên ${
        type === "image" ? "hình ảnh" : type === "video" ? "video" : "tệp"
      }. Vui lòng thử lại.`
    );
  };

  const onSuccess = (res: any) => {
    console.log("Upload successful:", res); // Debug log

    // Ensure the path starts with / for consistency
    const filePath = res.filePath.startsWith("/")
      ? res.filePath
      : `/${res.filePath}`;

    setFile({ ...res, filePath });
    onFileChange(filePath);
    setIsUploading(false);
    setProgress(0);
    toast.success(`Tải lên thành công!`);
  };

  const onValidate = (file: File) => {
    console.log("Validating file:", file.name, file.size); // Debug log

    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("Vui lòng chọn hình ảnh có kích thước nhỏ hơn 20MB");
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("Vui lòng chọn video có kích thước nhỏ hơn 50MB");
        return false;
      }
    } else {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Vui lòng chọn tệp có kích thước nhỏ hơn 10MB");
        return false;
      }
    }
    return true;
  };

  const handleRemoveFile = () => {
    setFile({ filePath: null });
    onFileChange("");
    toast.success("Đã xóa tệp");
  };

  // Check if ImageKit is properly configured
  const isImageKitConfigured = publicKey && urlEndpoint;

  if (!isImageKitConfigured) {
    return (
      <div className="p-6 border-2 border-dashed border-destructive rounded-md bg-destructive/5">
        <div className="text-center">
          <p className="text-destructive font-medium">
            ImageKit chưa được cấu hình
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Vui lòng kiểm tra environment variables
            NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY và NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
          </p>
        </div>
      </div>
    );
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="space-y-4">
        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          validateFile={onValidate}
          onUploadStart={() => {
            console.log("Upload started"); // Debug log
            setIsUploading(true);
            setProgress(0);
          }}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
            console.log(`Upload progress: ${percent}%`); // Debug log
          }}
          folder={folder}
          accept={accept}
          className="hidden"
        />

        {/* Upload button */}
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed",
            styles.button
          )}
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current && !disabled && !isUploading) {
              console.log("Triggering file upload"); // Debug log
              ikUploadRef.current.click();
            }
          }}
          disabled={disabled || isUploading}
        >
          <UploadIcon className="h-5 w-5" />
          <div className="text-center">
            <p className={cn("text-sm font-medium", styles.placeholder)}>
              {isUploading ? `Đang tải lên... ${progress}%` : placeholder}
            </p>
            {file?.filePath && (
              <p className={cn("text-xs mt-1 truncate max-w-xs", styles.text)}>
                {file.filePath}
              </p>
            )}
          </div>
        </button>

        {/* Progress bar */}
        {isUploading && progress > 0 && (
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* File preview */}
        {file?.filePath && (
          <div className="relative">
            {type === "image" ? (
              <div className="relative">
                <IKImage
                  alt={file.filePath}
                  path={file.filePath}
                  width={500}
                  height={300}
                  className="rounded-md border"
                />
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  aria-label="Xóa hình ảnh"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ) : type === "video" ? (
              <div className="relative">
                <IKVideo
                  path={file.filePath}
                  controls={true}
                  className="h-64 w-full rounded-md border"
                />
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  aria-label="Xóa video"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm font-medium truncate">
                  {file.filePath}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Xóa tệp"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;
