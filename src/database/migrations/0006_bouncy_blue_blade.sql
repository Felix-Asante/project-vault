CREATE TABLE IF NOT EXISTS "project_resources_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "project_resources" ADD COLUMN "resource_type" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_resource_type_project_resources_types_id_fk" FOREIGN KEY ("resource_type") REFERENCES "public"."project_resources_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
