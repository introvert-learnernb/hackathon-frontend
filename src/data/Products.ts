import { Product } from "@/types/definitions";

  
  // Array of Products
  export const Products: Product[] = [
    {
      id: 1,
      name: "Nikhil Upreti Product",
      price: "900.00",
      featuredImage: "https://randomuser.me/api/portraits/men/1.jpg",
      offerPrice: "800.00",
      unit: "piece",
      stockQuantity: 10,
      isActive: true,
      category: "Electronics", // Category
    },
    {
      id: 2,
      name: "Bipin Karki Special",
      price: "1200.00",
      featuredImage: "https://randomuser.me/api/portraits/men/2.jpg",
      offerPrice: "1000.00",
      unit: "set",
      stockQuantity: 5,
      isActive: true,
      categoryName: "Fashion", // Category
    },
    {
      id: 3,
      name: "Saugat Malla Exclusive",
      price: "700.00",
      featuredImage: "https://randomuser.me/api/portraits/men/3.jpg",
      offerPrice: "650.00",
      unit: "piece",
      stockQuantity: 15,
      isActive: false,
      categoryName: "Home Appliances", // Category
    },
    {
      id: 4,
      name: "Dayahang Rai Classic",
      price: "1500.00",
      featuredImage: "https://randomuser.me/api/portraits/men/4.jpg",
      offerPrice: "1400.00",
      unit: "box",
      stockQuantity: 8,
      isActive: true,
      categoryName: "Books", // Category
    },
    {
      id: 5,
      name: "Anmol KC Premium",
      price: "2000.00",
      featuredImage: "https://randomuser.me/api/portraits/men/5.jpg",
      offerPrice: "1800.00",
      unit: "bottle",
      stockQuantity: 12,
      isActive: false,
      categoryName: "Health & Wellness", // Category
    },
  ];
  