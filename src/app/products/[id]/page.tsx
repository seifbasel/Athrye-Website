"use client";

import ProductDetail from "@/components/product-details";
import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);

  return (
    <div>
      <ProductDetail productId={productId} />
    </div>
  );
};

export default ProductDetailPage;
