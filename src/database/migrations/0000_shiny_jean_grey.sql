CREATE TYPE "public"."basic_status_enum" AS ENUM('PUBLISHED', 'DRAFT', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'CUSTOMER');--> statement-breakpoint
CREATE TYPE "public"."user_account_provider" AS ENUM('GOOGLE', 'GITHUB', 'MANUAL', 'DISCORD', 'APPLE', 'FACEBOOK');--> statement-breakpoint
CREATE TYPE "public"."user_account_status_enum" AS ENUM('RESTRICTED', 'SUSPENDED', 'DELETED', 'NORMAL');--> statement-breakpoint
CREATE TYPE "public"."product_attr_type_enum" AS ENUM('COLOR', 'IMAGE', 'BUTTON', 'RADIO');--> statement-breakpoint
CREATE TYPE "public"."product_media_type_enum" AS ENUM('VIDEO', 'IMAGE');--> statement-breakpoint
CREATE TYPE "public"."product_stock_status_enum" AS ENUM('IN_STOCK', 'OUT_OF_STOCK', 'ON_BACK_ORDER');--> statement-breakpoint
CREATE TYPE "public"."product_variation_type_enum" AS ENUM('SET', 'DEFAULT');--> statement-breakpoint
CREATE TYPE "public"."notes_privacy_type_enum" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "public"."payment_provider_brand_enum" AS ENUM('paypal', 'sslcommerz', 'bkash', 'nagad');--> statement-breakpoint
CREATE TYPE "public"."payment_provider_setup_status_enum" AS ENUM('DONE', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."transaction_status_enum" AS ENUM('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED', 'EXPIRED', 'CHARGED_BACK', 'REFUND_FAILED', 'REFUND_INIT', 'PARTIAL_REFUND', 'PARTIAL_CHARGE_BACK');--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(20),
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
	"phone" varchar(30),
	"phone_code" varchar(10),
	"company" varchar(200),
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(20),
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
	"phone" varchar(30),
	"phone_code" varchar(10),
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
CREATE TABLE "users_shippping_infos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"label" varchar(100),
	"value" varchar(100) NOT NULL,
	"customer_note_id" uuid,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100),
	"email" varchar(255),
	"phone" varchar(30),
	"phone_code" varchar(10),
	"company" varchar(200),
	"addr1" varchar(300),
	"addr2" varchar(300),
	"city" varchar(100),
	"post_code" varchar(20),
	"country_iso" varchar(5),
	"state" varchar(50),
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_shippping_infos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(50) NOT NULL,
	"role" "user_role_enum" DEFAULT 'CUSTOMER' NOT NULL,
	"account_status" "user_account_status_enum" DEFAULT 'NORMAL' NOT NULL,
	"account_provider" "user_account_provider" DEFAULT 'MANUAL' NOT NULL,
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
	"stock_count" integer DEFAULT 0 NOT NULL,
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
	CONSTRAINT "product_attributes_id_unique" UNIQUE("id"),
	CONSTRAINT "product_attributes_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "product_attr_to_products" (
	"product_id" uuid,
	"product_attr_id" uuid,
	CONSTRAINT "product_attr_to_products_product_id_product_attr_id_pk" PRIMARY KEY("product_id","product_attr_id")
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
CREATE TABLE "product_cat_to_products" (
	"product_id" uuid,
	"product_cat_id" uuid,
	CONSTRAINT "product_cat_to_products_product_id_product_cat_id_pk" PRIMARY KEY("product_id","product_cat_id")
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
CREATE TABLE "product_media_to_products" (
	"product_id" uuid,
	"product_media_id" uuid,
	CONSTRAINT "product_media_to_products_product_id_product_media_id_pk" PRIMARY KEY("product_id","product_media_id")
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
	CONSTRAINT "product_variations_id_unique" UNIQUE("id"),
	CONSTRAINT "product_variations_sku_unique" UNIQUE("sku")
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
CREATE TABLE "order_to_products" (
	"order_id" uuid,
	"product_id" uuid,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "order_to_products_order_id_product_id_pk" PRIMARY KEY("order_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"customer_id" uuid,
	"note_id" uuid,
	"billing_id" uuid,
	"shipping_id" uuid,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"privacy_type" "notes_privacy_type_enum" DEFAULT 'PRIVATE' NOT NULL,
	"role" "user_role_enum" DEFAULT 'CUSTOMER' NOT NULL,
	"created_by_id" uuid,
	"title" varchar(100),
	"content" varchar(300) NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "notes_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "payment_providers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_by_id" uuid,
	"brand" "payment_provider_brand_enum" NOT NULL,
	"name" varchar(100) NOT NULL,
	"image" varchar(300) NOT NULL,
	"client_id" varchar(50),
	"client_secret" varchar(50),
	"success_url" varchar(255),
	"fail_url" varchar(255),
	"cancel_url" varchar(255),
	"ipn_url" varchar(255),
	"setup_status" "payment_provider_setup_status_enum" DEFAULT 'PENDING' NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payment_providers_id_unique" UNIQUE("id"),
	CONSTRAINT "payment_providers_brand_unique" UNIQUE("brand")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"order_id" uuid,
	"note_id" uuid,
	"discount" integer,
	"amount" integer NOT NULL,
	"currency" varchar(10) NOT NULL,
	"sessionKey" varchar(255),
	"status" "transaction_status_enum" DEFAULT 'INITIATED' NOT NULL,
	"user_id" uuid,
	"last_4" varchar(4),
	"card_holder_name" varchar(255),
	"provider_token" varchar(255),
	"provider_id" uuid,
	"metadata" jsonb,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transactions_id_unique" UNIQUE("id"),
	CONSTRAINT "transactions_sessionKey_unique" UNIQUE("sessionKey"),
	CONSTRAINT "transactions_provider_token_unique" UNIQUE("provider_token")
);
--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users_billing_infos" ADD CONSTRAINT "users_billing_infos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users_shippping_infos" ADD CONSTRAINT "users_shippping_infos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "users_shippping_infos" ADD CONSTRAINT "users_shippping_infos_customer_note_id_notes_id_fk" FOREIGN KEY ("customer_note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_attr_to_products" ADD CONSTRAINT "product_attr_to_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_attr_to_products" ADD CONSTRAINT "product_attr_to_products_product_attr_id_product_attributes_id_fk" FOREIGN KEY ("product_attr_id") REFERENCES "public"."product_attributes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_cat_id_product_categories_id_fk" FOREIGN KEY ("parent_cat_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_cat_to_products" ADD CONSTRAINT "product_cat_to_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_cat_to_products" ADD CONSTRAINT "product_cat_to_products_product_cat_id_product_categories_id_fk" FOREIGN KEY ("product_cat_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_medias" ADD CONSTRAINT "product_medias_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_media_to_products" ADD CONSTRAINT "product_media_to_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_media_to_products" ADD CONSTRAINT "product_media_to_products_product_media_id_product_medias_id_fk" FOREIGN KEY ("product_media_id") REFERENCES "public"."product_medias"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "product_variations" ADD CONSTRAINT "product_variations_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "order_to_products" ADD CONSTRAINT "order_to_products_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "order_to_products" ADD CONSTRAINT "order_to_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_billing_id_users_billing_infos_id_fk" FOREIGN KEY ("billing_id") REFERENCES "public"."users_billing_infos"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_id_users_shippping_infos_id_fk" FOREIGN KEY ("shipping_id") REFERENCES "public"."users_shippping_infos"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payment_providers" ADD CONSTRAINT "payment_providers_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_provider_id_payment_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."payment_providers"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "uaddr_user_id_fk_index" ON "user_addresses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ubilling_user_id_fk_index" ON "users_billing_infos" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ucontact_user_id_fk_index" ON "user_contacts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uprofile_user_id_fk_index" ON "user_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ushipping_user_id_fk_index" ON "users_shippping_infos" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ushipping_customer_note_id_fk_index" ON "users_shippping_infos" USING btree ("customer_note_id");--> statement-breakpoint
CREATE UNIQUE INDEX "inventory_product_id_fk_index" ON "inventory" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "pa_product_id_fk_index" ON "product_attributes" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "pc_product_id_fk_index" ON "product_categories" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "pm_product_id_fk_index" ON "product_medias" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "pv_product_id_fk_index" ON "product_variations" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "pcreated_by_user_id_fk_index" ON "products" USING btree ("created_by_id");--> statement-breakpoint
CREATE INDEX "ot_customer_id_fk_index" ON "orders" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "pp_brand_fk_index" ON "payment_providers" USING btree ("brand");--> statement-breakpoint
CREATE INDEX "transction_order_id_fk_index" ON "transactions" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "transction_user_id_fk_index" ON "transactions" USING btree ("user_id");