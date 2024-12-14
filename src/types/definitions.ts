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

