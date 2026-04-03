CREATE TYPE "public"."user_account_provider" AS ENUM('GOOGLE', 'GITHUB', 'MANUAL', 'DISCORD', 'APPLE', 'FACEBOOK');--> statement-breakpoint
CREATE TYPE "public"."user_account_status_enum" AS ENUM('RESTRICTED', 'SUSPENDED', 'DELETED', 'NORMAL');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'CUSTOMER');--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(12),
	"country_iso" varchar(2),
	"state" varchar(50),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_addresses_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_contacts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"email" varchar(255),
	"phone" varchar(20),
	"countryCode" varchar(5),
	CONSTRAINT "user_contacts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100),
	"avatar" varchar(300),
	"cover_img" varchar(300),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"username" varchar(100),
	"role" "user_role_enum" DEFAULT 'CUSTOMER',
	"account_status" "user_account_status_enum" DEFAULT 'NORMAL',
	"account_provider" "user_account_provider" DEFAULT 'MANUAL',
	"is_verified" boolean DEFAULT false NOT NULL,
	"verify_expiry" timestamp,
	"verify_code" varchar(8),
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_verify_code_unique" UNIQUE("verify_code")
);
--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;