CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"full_name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "awb" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"no_awb" text NOT NULL UNIQUE,
	"no_resi" text NOT NULL UNIQUE,
	"no_station" text NOT NULL,
	"no_struk" text NOT NULL,
	"tgl_struk" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "awb" ("user_id");--> statement-breakpoint
ALTER TABLE "awb" ADD CONSTRAINT "awb_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;