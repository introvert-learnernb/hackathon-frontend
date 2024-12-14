export interface enumTypes {
  id?: number | string;
  name: string;
}
export const unit: enumTypes[] = [
  { id: "kg", name: "Kg" },
  { id: "piece", name: "Piece" },
  { id: "litre", name: "Litre" },
  { id: "dozen", name: "Dozen" },
  { id: "pack", name: "Pack" },
];

// Interface for Product
export interface Product {
  id: number;
  name: string;
  price: string;
  offerPrice: string;
  featuredImage: string | null;
  unit: "kg" | "piece" | "litre" | "dozen" | "pack";
  stockQuantity: number;
  isActive: boolean; // Product status
  category: any; // New field added
  description?: string;
}

export interface Category {
  id: number;
  name: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  name: string;
  email: string;
  customer_id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
  image_url: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};
