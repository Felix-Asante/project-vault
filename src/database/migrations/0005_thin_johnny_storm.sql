ALTER TABLE "project_notes" RENAME TO "project_resources";--> statement-breakpoint
ALTER TABLE "project_resources" DROP CONSTRAINT "project_notes_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "project_resources" DROP CONSTRAINT "project_notes_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "project_resources" DROP CONSTRAINT "project_notes_last_updated_by_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_resources" ADD CONSTRAINT "project_resources_last_updated_by_users_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
