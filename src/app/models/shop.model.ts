// Represents a product in the shop
export interface Product {
  id: number;             // Unique product ID
  title: string;          // Product title/name
  price: number;          // Price in USD
  description: string;    // Product description
  category: string;       // Product category (e.g., electronics, clothing)
  image: string;          // URL to product image
  rating: {               // Rating info
    rate: number;         // Average rating (1–5)
    count: number;        // Number of reviews
  };
}