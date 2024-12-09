import React from "react";
import CoinCard from "@/components/ui/product-card";
import Product from "@/types/product";

const exampleCoins: Product[] = [
  {
    id: "1",
    imageUrl: "/coin1.jpg",
    name: "1854 Indian Head Gold Dollar",
    year: 1854,
    price: 12500,
    rarity: "Very Rare",
    condition: "MS-63",
    description:
      "A magnificent example of early American gold coinage, featuring the classic Indian Head design by James B. Longacre. This piece exhibits exceptional strike quality and original mint luster.",
    origin: "England",
    material: "Gold",
  },
  {
    id: "2",
    imageUrl: "/coin1.jpg",
    name: "Ancient Roman Aureus",
    year: 2000,
    price: 28000,
    rarity: "Extremely Rare",
    condition: "XF-45",
    description:
      "An extraordinary Roman gold coin from the reign of Emperor Hadrian. Well-centered with sharp details and beautiful golden toning.",
    origin: "Egypt",
    material: "silver",

  },
  {
    id: "3",
    imageUrl: "/coin1.jpg",
    name: "Ancient Roman Aureus",
    year: 1990,
    price: 28000,
    rarity: "Extremely Rare",
    condition: "XF-45",
    description:
      "An extraordinary Roman gold coin from the reign of Emperor Hadrian. Well-centered with sharp details and beautiful golden toning.",
    origin: "france",
    material: "copper",

  },
];

export const CoinGrid = () => {
  return (
    <div >
      <h1 className="text-text-dark dark:text-text font-playfair text-4xl font-semibold mb-6">
        Premium Coin Collection
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {exampleCoins.map((coin) => (
          <div key={coin.id} className="w-full min-w-0 p-4">
            <CoinCard {...coin} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinGrid;
