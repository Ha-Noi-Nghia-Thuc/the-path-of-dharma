import {
  date,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("USER"),
  lastActiivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const sutras = pgTable("sutras", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  scripture: varchar("scripture", { length: 100 }).notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  coverUrl: text("cover_url").notNull(),
  pdfUrl: text("pdf_url"),
  linkUrl: text("link_url"),
  videoUrl: text("video_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const sutraViews = pgTable("sutra_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  sutraId: uuid("sutra_id")
    .notNull()
    .references(() => sutras.id),
  viewedAt: timestamp("viewed_at", { withTimezone: true }).defaultNow(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const sutraTags = pgTable(
  "sutra_tags",
  {
    sutraId: uuid("sutra_id")
      .notNull()
      .references(() => sutras.id),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sutraId, table.tagId] }),
  })
);
