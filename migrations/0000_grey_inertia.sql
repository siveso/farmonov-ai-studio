CREATE TABLE "analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	"user_agent" text,
	"referer" text,
	"ip" text,
	"country" text,
	"device" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_scheduler" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"scheduled_at" timestamp NOT NULL,
	"executed" boolean DEFAULT false,
	"executed_at" timestamp,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"business_type" text,
	"service_type" text,
	"budget" text,
	"timeline" text,
	"message" text,
	"source" text DEFAULT 'contact_form',
	"status" text DEFAULT 'new',
	"priority" text DEFAULT 'medium',
	"notes" text,
	"follow_up_date" timestamp,
	"converted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"category" text NOT NULL,
	"tags" text[],
	"author" text DEFAULT 'Akram Farmonov' NOT NULL,
	"featured_image" text,
	"published" boolean DEFAULT false,
	"published_at" timestamp,
	"read_time" integer,
	"views" integer DEFAULT 0,
	"likes" integer DEFAULT 0,
	"seo_title" text,
	"seo_description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text,
	"category" text NOT NULL,
	"technologies" text[],
	"features" text[],
	"results" json,
	"images" text[],
	"client" text,
	"year" text,
	"duration" text,
	"featured" boolean DEFAULT false,
	"live_url" text,
	"case_study_url" text,
	"github_url" text,
	"telegram_url" text,
	"testimonial" json,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"description" text NOT NULL,
	"features" text[],
	"pricing" json,
	"timeline" text,
	"technologies" text[],
	"icon" text,
	"color" text DEFAULT 'primary',
	"popular" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "blog_scheduler" ADD CONSTRAINT "blog_scheduler_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;