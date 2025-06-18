import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";

// User role enum
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("USER").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(), // Fixed typo
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Sutras table
export const sutras = pgTable("sutras", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  scripture: varchar("scripture", { length: 100 }).notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  coverColor: varchar("cover_color", { length: 7 })
    .notNull()
    .default("#C9A66B"),
  coverUrl: text("cover_url").notNull(),
  pdfUrl: text("pdf_url"),
  linkUrl: text("link_url"),
  videoUrl: text("video_url"),
  totalView: integer("total_view").default(0).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Sutra views tracking table
export const sutraViews = pgTable("sutra_views", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sutraId: uuid("sutra_id")
    .notNull()
    .references(() => sutras.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// User saved sutras (many-to-many relationship)
export const userSavedSutras = pgTable("user_saved_sutras", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sutraId: uuid("sutra_id")
    .notNull()
    .references(() => sutras.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Sutra categories relationship (many-to-many)
export const sutraCategories = pgTable("sutra_categories", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  sutraId: uuid("sutra_id")
    .notNull()
    .references(() => sutras.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tags table
export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Sutra tags relationship (many-to-many with composite primary key)
export const sutraTags = pgTable(
  "sutra_tags",
  {
    sutraId: uuid("sutra_id")
      .notNull()
      .references(() => sutras.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.sutraId, table.tagId] }),
  })
);

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Sutra = typeof sutras.$inferSelect;
export type NewSutra = typeof sutras.$inferInsert;

export type SutraView = typeof sutraViews.$inferSelect;
export type NewSutraView = typeof sutraViews.$inferInsert;

export type UserSavedSutra = typeof userSavedSutras.$inferSelect;
export type NewUserSavedSutra = typeof userSavedSutras.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type SutraCategory = typeof sutraCategories.$inferSelect;
export type NewSutraCategory = typeof sutraCategories.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type SutraTag = typeof sutraTags.$inferSelect;
export type NewSutraTag = typeof sutraTags.$inferInsert;
