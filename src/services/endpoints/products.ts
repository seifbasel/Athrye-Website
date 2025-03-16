import axios from "axios";
import Product from "@/types/product";
import { API_URL } from "@/config/config";

// Helper function to transform image URLs
const transformImageUrl = (partialUrl: string): string => {
  if (!partialUrl) return "";
  if (partialUrl.startsWith("http")) return partialUrl;
  const baseUrl = API_URL.replace("/api", "");
  return `${baseUrl}${partialUrl}`;
};

// Helper function to transform product data
const transformProductData = (product: Product): Product => {
  return {
    ...product,
    main_image: product.main_image
      ? {
          ...product.main_image,
          image: transformImageUrl(product.main_image.image),
        }
      : undefined,
    images: (product.images || []).map((img) => ({
      ...img,
      image: transformImageUrl(img.image),
    })),
  };
};

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products/`);
    return response.data.map((product: Product) =>
      transformProductData(product)
    );
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_URL}/products/${id}/`);
    return transformProductData(response.data);
  },

  getProductImagesById: async (productId: number): Promise<any[]> => {
    const response = await axios.get(
      `${API_URL}/products/${productId}/images/`
    );
    return response.data.map((image: { image: string }) => ({
      ...image,
      image: transformImageUrl(image.image),
    }));
  },
};
