ALTER TABLE "users" ALTER COLUMN "photo" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "plan" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");