"use client";

import FileUpload from "@/components/common/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sutraSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import ColorPicker from "./color-picker";

interface SutraFormProps {
  type?: "create" | "update";
  defaultValues?: Partial<z.infer<typeof sutraSchema>>;
  sutraId?: string;
}

/**
 * Sutra form component for creating and updating sutras
 * Used in admin panel for content management
 */
const SutraForm = ({
  type = "create",
  defaultValues,
  sutraId,
}: SutraFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof sutraSchema>>({
    resolver: zodResolver(sutraSchema),
    defaultValues: {
      title: "",
      author: "",
      scripture: "",
      description: "",
      coverUrl: "",
      pdfUrl: "",
      linkUrl: "",
      coverColor: "#C9A66B",
      videoUrl: "",
      summary: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: z.infer<typeof sutraSchema>) => {
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call
      console.log("Sutra data:", data);

      toast.success(
        type === "create"
          ? "Kinh điển đã được thêm thành công!"
          : "Kinh điển đã được cập nhật thành công!"
      );

      // Redirect to sutras list
      router.push("/admin/sutras");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tựa đề kinh *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tựa đề kinh điển"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author field */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tác giả *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tên tác giả hoặc người dịch"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Scripture field */}
          <FormField
            control={form.control}
            name="scripture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên bộ kinh *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ví dụ: Bát Nhã Ba La Mật"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả ngắn *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả nội dung chính của kinh điển"
                    rows={3}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Summary field */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tóm tắt chi tiết *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tóm tắt nội dung chi tiết của kinh điển"
                    rows={5}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover image field */}
          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh bìa *</FormLabel>
                <FormControl>
                  <FileUpload
                    type="image"
                    accept="image/*"
                    folder="sutras/covers"
                    variant="light"
                    placeholder="Tải ảnh bìa kinh điển"
                    value={field.value}
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover color field */}
          <FormField
            control={form.control}
            name="coverColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Màu nền chủ đạo</FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value}
                    onPickerChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PDF file field */}
          <FormField
            control={form.control}
            name="pdfUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tệp PDF (tùy chọn)</FormLabel>
                <FormControl>
                  <FileUpload
                    type="file"
                    accept=".pdf"
                    folder="sutras/pdfs"
                    variant="light"
                    placeholder="Tải tệp PDF kinh điển"
                    value={field.value}
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video field */}
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video giới thiệu (tùy chọn)</FormLabel>
                <FormControl>
                  <FileUpload
                    type="video"
                    accept="video/*"
                    folder="sutras/videos"
                    variant="light"
                    placeholder="Tải video giới thiệu"
                    value={field.value}
                    onFileChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* External link field */}
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liên kết tham khảo (tùy chọn)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting
                ? "Đang xử lý..."
                : type === "update"
                ? "Cập nhật kinh điển"
                : "Thêm kinh điển"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Hủy bỏ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SutraForm;
