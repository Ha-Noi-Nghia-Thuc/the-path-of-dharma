import { z } from "zod";

// Authentication schemas
export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được vượt quá 100 ký tự")
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 ký tự"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(100, "Mật khẩu không được vượt quá 100 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 ký tự"),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu")
    .max(100, "Mật khẩu không được vượt quá 100 ký tự"),
});

// Sutra schema - Updated to match new structure
export const sutraSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Tựa đề phải có ít nhất 2 ký tự")
    .max(255, "Tựa đề không được vượt quá 255 ký tự"),
  author: z
    .string()
    .trim()
    .min(2, "Tên tác giả phải có ít nhất 2 ký tự")
    .max(255, "Tên tác giả không được vượt quá 255 ký tự"),
  scripture: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn loại kinh điển")
    .max(100, "Loại kinh điển không được vượt quá 100 ký tự"),
  description: z
    .string()
    .trim()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(1000, "Mô tả không được vượt quá 1000 ký tự"),
  summary: z
    .string()
    .trim()
    .min(10, "Tóm tắt phải có ít nhất 10 ký tự")
    .max(5000, "Tóm tắt không được vượt quá 5000 ký tự"),
  // Accept both relative paths (from ImageKit) and full URLs
  coverUrl: z
    .string()
    .trim()
    .min(1, "Vui lòng tải lên ảnh bìa")
    .refine((value) => {
      // Accept relative paths starting with /
      if (value.startsWith("/")) return true;
      // Accept full URLs
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, "URL ảnh bìa không hợp lệ"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, "Màu phải có định dạng hex (#RRGGBB)")
    .default("#C9A66B"),
  // Optional URLs - accept empty string, relative paths, or full URLs
  pdfUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => {
      if (!value || value === "") return true;
      if (value.startsWith("/")) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, "URL PDF không hợp lệ")
    .or(z.literal("")),
  videoUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => {
      if (!value || value === "") return true;
      if (value.startsWith("/")) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, "URL video không hợp lệ")
    .or(z.literal("")),
  linkUrl: z
    .string()
    .trim()
    .optional()
    .refine((value) => {
      if (!value || value === "") return true;
      if (value.startsWith("/")) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, "URL liên kết không hợp lệ")
    .or(z.literal("")),
  totalView: z
    .number()
    .int("Lượt xem phải là số nguyên")
    .min(0, "Lượt xem không được âm")
    .max(1000000, "Lượt xem không được vượt quá 1,000,000")
    .default(0),
  isPublished: z.boolean().default(true),
  tags: z.array(z.string().trim().min(1).max(50)).optional(),
});

// Category schema
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
    .max(100, "Tên danh mục không được vượt quá 100 ký tự"),
  description: z
    .string()
    .trim()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .optional(),
  slug: z
    .string()
    .trim()
    .min(2, "Slug phải có ít nhất 2 ký tự")
    .max(100, "Slug không được vượt quá 100 ký tự")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"
    ),
});

// Tag schema
export const tagSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên tag phải có ít nhất 1 ký tự")
    .max(50, "Tên tag không được vượt quá 50 ký tự")
    .regex(
      /^[a-zA-ZÀ-ỹ0-9\s]+$/,
      "Tag chỉ được chứa chữ cái, số và khoảng trắng"
    ),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z
    .number()
    .int("Trang phải là số nguyên")
    .min(1, "Trang phải lớn hơn 0")
    .default(1),
  limit: z
    .number()
    .int("Giới hạn phải là số nguyên")
    .min(1, "Giới hạn phải lớn hơn 0")
    .max(100, "Giới hạn không được vượt quá 100")
    .default(10),
});

// Search schema - Updated with new fields
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Từ khóa tìm kiếm không được để trống")
    .max(100, "Từ khóa tìm kiếm không được vượt quá 100 ký tự"),
  category: z.string().optional(),
  scripture: z.enum(["Kinh", "Luật", "Luận"]).optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z
    .enum(["title", "author", "createdAt", "totalView", "rating"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Export types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type SutraInput = z.infer<typeof sutraSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TagInput = z.infer<typeof tagSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
