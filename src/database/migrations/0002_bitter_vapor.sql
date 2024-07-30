ALTER TABLE "roles" ALTER COLUMN "permissions" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "total_members" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "key" text;