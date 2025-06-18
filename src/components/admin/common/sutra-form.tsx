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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ColorPicker from "./color-picker";

interface Props {
  type?: "create" | "update";
  defaultValues?: Partial<z.infer<typeof sutraSchema>>;
}

const SutraForm = ({ type = "create", defaultValues }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof sutraSchema>>({
    resolver: zodResolver(sutraSchema),
    defaultValues: {
      title: "",
      author: "",
      scripture: "",
      description: "",
      totalView: 0,
      coverUrl: "",
      pdfUrl: "",
      linkUrl: "",
      coverColor: "#ffffff",
      videoUrl: "",
      summary: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tựa đề kinh</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tựa đề kinh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tác giả</FormLabel>
              <FormControl>
                <Input placeholder="Tên tác giả" {...field} />
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
              <FormLabel>Tên bộ kinh</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Bát Nhã Ba La Mật" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả ngắn</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả nội dung chính của kinh"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalView"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lượt xem</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={10000} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh bìa</FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  folder="sutras/covers"
                  variant="light"
                  placeholder="Tải ảnh bìa"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdfUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tệp PDF (tuỳ chọn)</FormLabel>
              <FormControl>
                <FileUpload
                  type="file"
                  accept=".pdf"
                  folder="sutras/pdfs"
                  variant="light"
                  placeholder="Tải tệp PDF"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Liên kết ngoài</FormLabel>
              <FormControl>
                <Input placeholder="URL hoặc liên kết tham khảo" {...field} />
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
                  placeholder="Tải video"
                  value={field.value}
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tóm tắt kinh</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tóm tắt nội dung chi tiết"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          {type === "update" ? "Cập nhật Kinh" : "Thêm Kinh vào Thư viện"}
        </Button>
      </form>
    </Form>
  );
};

export default SutraForm;
