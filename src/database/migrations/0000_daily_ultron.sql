CREATE TYPE "public"."basic_status_enum" AS ENUM('PUBLISHED', 'DRAFT', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."user_account_provider" AS ENUM('GOOGLE', 'GITHUB', 'MANUAL', 'DISCORD', 'APPLE', 'FACEBOOK');--> statement-breakpoint
CREATE TYPE "public"."user_account_status_enum" AS ENUM('RESTRICTED', 'SUSPENDED', 'DELETED', 'NORMAL');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'CUSTOMER');--> statement-breakpoint
CREATE TYPE "public"."product_attr_type_enum" AS ENUM('COLOR', 'IMAGE', 'BUTTON', 'RADIO');--> statement-breakpoint
CREATE TYPE "public"."product_media_type_enum" AS ENUM('VIDEO', 'IMAGE');--> statement-breakpoint
CREATE TYPE "public"."product_stock_status_enum" AS ENUM('IN_STOCK', 'OUT_OF_STOCK', 'ON_BACK_ORDER');--> statement-breakpoint
CREATE TYPE "public"."product_variation_type_enum" AS ENUM('SET', 'DEFAULT');--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(12),
	"country_iso" varchar(5),
	"state" varchar(50),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_addresses_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users_billing_infos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"label" varchar(100),
	"value" varchar(100) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100),
	"email" varchar(255),
	"phone" varchar(20),
	"countryCode" varchar(5),
	"company" varchar(200),
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(12),
	"country_iso" varchar(5),
	"state" varchar(50),
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_billing_infos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_contacts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"email" varchar(255),
	"phone" varchar(20),
	"countryCode" varchar(5),
	"company" varchar(200),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
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
CREATE TABLE "inventory" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"stock_count" integer DEFAULT 1 NOT NULL,
	"stock_status" "product_stock_status_enum" DEFAULT 'IN_STOCK' NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inventory_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_attributes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"label" varchar(100) NOT NULL,
	"value" varchar(100) NOT NULL,
	"type" "product_attr_type_enum" NOT NULL,
	"attributes" jsonb,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_attributes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"title" varchar(100),
	"slug" varchar(100) NOT NULL,
	"icon" varchar(50),
	"image" varchar(300),
	"status" "basic_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"parent_cat_id" uuid,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_categories_id_unique" UNIQUE("id"),
	CONSTRAINT "product_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_medias" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"title" varchar(100),
	"desc" varchar(255),
	"type" "product_media_type_enum" DEFAULT 'IMAGE' NOT NULL,
	"src" varchar(300) NOT NULL,
	"status" "basic_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_medias_id_unique" UNIQUE("id"),
	CONSTRAINT "product_medias_src_unique" UNIQUE("src")
);
--> statement-breakpoint
CREATE TABLE "product_variations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"product_id" uuid,
	"type" "product_variation_type_enum" DEFAULT 'DEFAULT' NOT NULL,
	"set_attrs" text[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
	"identifiers" jsonb,
	"sku" varchar(20) NOT NULL,
	"regular_price" integer,
	"sale_price" integer NOT NULL,
	"discount" integer,
	"weight" integer,
	"dimentions" jsonb,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_variations_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"status" "basic_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"created_by_id" uuid NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_id_unique" UNIQUE("id"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users_billing_infos" ADD CONSTRAINT "users_billing_infos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_cat_id_product_categories_id_fk" FOREIGN KEY ("parent_cat_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_medias" ADD CONSTRAINT "product_medias_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_variations" ADD CONSTRAINT "product_variations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;