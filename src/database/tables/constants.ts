export const ROLE_VALUES = ["ADMIN", "CUSTOMER"] as const;

export const USER_ACCOUNT_STATUS_VALUES = [
  "RESTRICTED",
  "SUSPENDED",
  "DELETED",
  "NORMAL",
] as const;

export const USER_ACCOUNT_PROVIDER_VALUES = [
  "GOOGLE",
  "GITHUB",
  "MANUAL",
  "DISCORD",
  "APPLE",
  "FACEBOOK",
] as const;

export const BASIC_STATUS_VALUES = ["PUBLISHED", "DRAFT", "DELETED"] as const;

export const PRODUCT_MEDIA_TYPE_VALUES = ["VIDEO", "IMAGE"] as const;

export const PRODUCT_ATTRIBUTES_TYPE_VALUES = [
  "COLOR",
  "IMAGE",
  "BUTTON",
  "RADIO",
] as const;

export const PRODUCT_VARIATION_TYPE_VALUES = ["SET", "DEFAULT"] as const;

export const PRODUCT_STOCK_STATUS_VALUES = [
  "IN_STOCK",
  "OUT_OF_STOCK",
  "ON_BACK_ORDER",
] as const;

export const NOTE_PRIVACY_TYPE_VALUES = ["PUBLIC", "PRIVATE"] as const;

export const PAYMENT_PROVIDER_BRAND_VALUES = [
  "paypal",
  "sslcommerz",
  "bkash",
  "nagad",
] as const;

export const PAYMENT_PROVIDER_SETUP_STATUS_VALUES = [
  "DONE",
  "PENDING",
] as const;

export const TRANSACTION_STATUS_VALUES = [
  "INITIATED",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
  "EXPIRED",
  "CHARGED_BACK",
  "REFUND_FAILED",
  "REFUND_INIT",
  "PARTIAL_REFUND",
  "PARTIAL_CHARGE_BACK",
] as const;
