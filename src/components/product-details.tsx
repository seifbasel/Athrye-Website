import React, { useState } from "react";
import Image from "next/image";
import { useProduct } from "@/hooks/products/use-get-product-by-id";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailProps {
  productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const { data: product, isLoading, error } = useProduct(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState("1");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-text-dark dark:text-text" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-text-dark dark:text-text">
        Error loading product details. Please try again later.
      </div>
    );
  }

  // Get array of all images
  const allImages = product?.images || [];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Calculate total price based on quantity
  const totalPrice = product ? product.price * parseInt(quantity) : 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-background dark:bg-background-dark">
            <Image
              src={allImages[selectedImage]?.image || "/placeholder.jpg"}
              alt={
                allImages[selectedImage]?.alt_text ||
                product?.name ||
                "Product image"
              }
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/80 hover:bg-primary"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/80 hover:bg-primary"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image.image}
                    alt={
                      image.alt_text ||
                      `${product?.name} thumbnail ${index + 1}`
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-text-dark dark:text-text">
              {product?.name}
            </h1>
            <div className="mt-2 space-y-2">
              <p className="text-2xl font-semibold text-text-dark dark:text-text">
                Unit Price: {Number(product?.price).toLocaleString()} EGP
              </p>
              {parseInt(quantity) > 1 && (
                <p className="text-lg text-text-dark dark:text-text">
                  Total: {totalPrice.toLocaleString()} EGP
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Year:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.year}
                </p>
              </div>
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Origin:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.origin}
                </p>
              </div>
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Rarity:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.rarity}
                </p>
              </div>
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Condition:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.condition}
                </p>
              </div>
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Material:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.material}
                </p>
              </div>
              <div>
                <span className="text-sm font-montserrat font-light text-card-foreground dark:text-text">
                  Available:
                </span>
                <p className="font-semibold text-text-dark dark:text-text">
                  {product?.quantity} pieces
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-text-dark dark:text-text">
                Description
              </h2>
              <p className="text-card-foreground dark:text-text">
                {product?.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-card-foreground dark:text-text">
                  Quantity
                </label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: Math.min(5, product?.quantity || 0) },
                      (_, i) => i + 1
                    ).map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="text-text-dark dark:text-text"
                      >
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Add to Cart
                </Button>
                <Button variant="default" className="flex-1">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
