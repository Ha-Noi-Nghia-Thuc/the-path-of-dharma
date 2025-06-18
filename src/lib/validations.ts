import { z } from "zod";

// schema for Sign Up form
export const signUpSchema = z.object({
  fullName: z.string().min(3, { message: "Họ tên phải có ít nhất 3 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/[A-Z]/, {
      message: "Mật khẩu phải chứa ít nhất 1 chữ hoa",
    })
    .regex(/[a-z]/, {
      message: "Mật khẩu phải chứa ít nhất 1 chữ thường",
    })
    .regex(/[0-9]/, {
      message: "Mật khẩu phải chứa ít nhất 1 chữ số",
    }),
});

// schema for Sign In form
export const signInSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

// schema for sutra
export const sutraSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Tiêu đề phải có ít nhất 2 ký tự" })
    .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
  author: z
    .string()
    .trim()
    .min(2, { message: "Tên tác giả phải có ít nhất 2 ký tự" })
    .max(100, { message: "Tên tác giả không được vượt quá 100 ký tự" }),
  scripture: z
    .string()
    .trim()
    .min(2, { message: "Thể loại không được để trống" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" })
    .max(1000, { message: "Mô tả không được vượt quá 1000 ký tự" }),
  summary: z
    .string()
    .trim()
    .min(10, { message: "Tóm tắt phải có ít nhất 10 ký tự" }),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, {
      message: "Mã màu không hợp lệ (ví dụ: #AABBCC)",
    }),
  coverUrl: z.string().url({ message: "Link ảnh bìa không hợp lệ" }),
  pdfUrl: z.string().url({ message: "Đường dẫn PDF không hợp lệ" }).optional(),
  linkUrl: z
    .string()
    .url({ message: "Đường dẫn ngoài không hợp lệ" })
    .optional(),
  videoUrl: z.string().url({ message: "Đường dẫn video không hợp lệ" }),
});
