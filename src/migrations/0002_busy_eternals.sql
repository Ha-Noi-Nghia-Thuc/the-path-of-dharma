ALTER TABLE "sutras" ALTER COLUMN "total_view" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sutras" ADD COLUMN "rating" numeric(3, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "sutras" ADD COLUMN "is_published" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;