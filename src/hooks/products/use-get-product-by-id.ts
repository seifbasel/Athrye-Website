import { productApi } from "@/services/endpoints/products";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => await productApi.getProductById(id),
        enabled: !!id, // Ensures the query only runs if id is provided
    });
};
