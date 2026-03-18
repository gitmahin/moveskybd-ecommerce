type PaymentMethodType = {
  id: number;
  label: string;
  value: string
  image: string;
};

export const PAYMENT_METHODS: PaymentMethodType[] = [
  { id: 1, label: "VISA", value: "visa", image: "/payments/visa.png" },
  { id: 2, label: "AMEX", value: "amex", image: "/payments/amex.png" },
  { id: 3, label: "MasterCard", value: "mastercard", image: "/payments/mastercard.png" },
  { id: 4, label: "bKash", value: "bkash", image: "/payments/bkash.png" },
  { id: 5, label: "Nagad", value: "nagad", image: "/payments/nagad.png" },
  { id: 6, label: "DBBL", value: "dbbl", image: "/payments/dbbl.png" },
];