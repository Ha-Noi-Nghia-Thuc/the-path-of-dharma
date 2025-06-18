// authentication types
interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
}

// user types
interface User {
  id: string;
  fullName: string;
  email: string;
  role: "USER" | "ADMIN";
  lastActivityDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

// sutra types
interface Sutra {
  id: string;
  title: string;
  author: string;
  scripture: "Kinh" | "Luật" | "Luận" | string;
  description: string;
  summary: string;
  totalView: number;
  coverColor: string;
  coverUrl: string;
  pdfUrl?: string;
  linkUrl?: string;
  videoUrl?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// sutra creation parameters
interface SutraParams {
  title: string;
  author: string;
  scripture: "Kinh" | "Luật" | "Luận" | string;
  description: string;
  summary: string;
  coverColor: string;
  coverUrl: string;
  pdfUrl?: string;
  linkUrl?: string;
  videoUrl?: string;
  tags?: string[];
}

// legacy sutra type for backward compatibility
interface LegacySutra {
  id: string | number;
  title: string;
  author: string;
  rating: number;
  description: string;
  color: string;
  cover: string;
  pdf?: string;
  link?: string;
  video: string;
  summary: string;
}

// category types
interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// tag types
interface Tag {
  id: string;
  name: string;
  createdAt: Date;
}

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// pagination types
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

// form types
interface FormState {
  success: boolean;
  error?: string;
  data?: any;
}

// search types
interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  scripture?: "Kinh" | "Luật" | "Luận";
  sortBy?: "title" | "author" | "createdAt" | "totalView" | "rating";
  sortOrder?: "asc" | "desc";
}

// file upload types
interface UploadedFile {
  filePath: string;
  url: string;
  size: number;
  type: string;
}

// session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
  }
}

// global error types
interface AppError extends Error {
  code?: string;
  statusCode?: number;
}

// environment variables
interface ProcessEnv {
  NODE_ENV: "development" | "production" | "test";
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  DATABASE_URL: string;
  NEXT_PUBLIC_API_ENDPOINT: string;
  NEXT_PUBLIC_PROD_API_ENDPOINT: string;
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: string;
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: string;
  IMAGEKIT_PRIVATE_KEY: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  QSTASH_URL: string;
  QSTASH_TOKEN: string;
  QSTASH_CURRENT_SIGNING_KEY: string;
  QSTASH_NEXT_SIGNING_KEY: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
}
