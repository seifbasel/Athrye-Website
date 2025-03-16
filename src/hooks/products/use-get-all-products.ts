import { productApi } from "@/services/endpoints/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => await productApi.getAllProducts(),
    });
};
