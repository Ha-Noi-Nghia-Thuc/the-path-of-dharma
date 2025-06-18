"use client";

import type React from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SCRIPTURE_TYPES } from "@/constants";
import { createSutra, updateSutra } from "@/lib/admin/actions/sutra";
import { sutraSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ColorPicker from "./color-picker";

interface SutraFormProps {
  type?: "create" | "update";
  defaultValues?: Partial<SutraFormData>;
  sutraId?: string;
}

type SutraFormData = {
  title: string;
  author: string;
  scripture: string;
  description: string;
  summary: string;
  coverColor: string;
  coverUrl: string;
  pdfUrl?: string;
  linkUrl?: string;
  videoUrl?: string;
  tags?: string[];
};

const SutraForm = ({
  type = "create",
  defaultValues,
  sutraId,
}: SutraFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<SutraFormData>({
    resolver: zodResolver(sutraSchema) as any,
    defaultValues: {
      title: "",
      author: "",
      scripture: "Kinh",
      description: "",
      summary: "",
      coverUrl: "",
      coverColor: "#C9A66B",
      pdfUrl: "",
      linkUrl: "",
      videoUrl: "",
      tags: [],
      ...defaultValues,
    },
  });

  const onSubmit = async (data: SutraFormData) => {
    setIsSubmitting(true);

    try {
      // Add totalView only for create operations, let database handle the default
      const sutraData = {
        ...data,
        tags,
        ...(type === "create" && { totalView: 0 }), // Add totalView: 0 for create
      } as any; // Type assertion to handle the mismatch

      let result;
      if (type === "create") {
        result = await createSutra(sutraData);
      } else if (sutraId) {
        result = await updateSutra(sutraId, sutraData);
      }

      if (result?.success) {
        toast.success(
          type === "create"
            ? "Kinh điển đã được thêm thành công!"
            : "Kinh điển đã được cập nhật thành công!"
        );
        router.push("/admin/sutras");
      } else {
        toast.error(result?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
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

          {/* Author and Scripture row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="scripture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại kinh điển *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại kinh điển" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SCRIPTURE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          {/* Cover image and color row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>

          {/* Tags section */}
          <div className="space-y-3">
            <FormLabel>Thẻ tag (tối đa 10)</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tag và nhấn Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                disabled={isSubmitting || tags.length >= 10}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={
                  !tagInput.trim() ||
                  tags.includes(tagInput.trim()) ||
                  tags.length >= 10 ||
                  isSubmitting
                }
              >
                <TagIcon size={16} />
                Thêm
              </Button>
            </div>

            {/* Display tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      disabled={isSubmitting}
                      className="hover:text-destructive"
                    >
                      <XIcon size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Optional files section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Tệp đính kèm (tùy chọn)</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pdfUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tệp PDF</FormLabel>
                    <FormControl>
                      <FileUpload
                        type="file"
                        accept=".pdf"
                        folder="sutras/pdfs"
                        variant="light"
                        placeholder="Tải tệp PDF kinh điển"
                        value={field.value}
                        onFileChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video giới thiệu</FormLabel>
                    <FormControl>
                      <FileUpload
                        type="video"
                        accept="video/*"
                        folder="sutras/videos"
                        variant="light"
                        placeholder="Tải video giới thiệu"
                        value={field.value}
                        onFileChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="linkUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liên kết tham khảo</FormLabel>
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
          </div>

          {/* Submit buttons */}
          <div className="flex gap-4 pt-4 border-t">
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
