import { productApi } from "@/services/endpoints/products";
import { useQuery } from "@tanstack/react-query";

export const useProductImages = (productId: number) => {
    return useQuery({
        queryKey: ['productImages', productId],
        queryFn: async () => await productApi.getProductImagesById(productId),
        enabled: !!productId, // Ensures the query only runs if productId is provided
    });
};
