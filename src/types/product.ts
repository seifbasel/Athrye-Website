import imageItem from "./image-item";

type Product = {
  id?: string;
  name: string;
  price: number;
  year: number;
  rarity: string;
  quantity: number;
  condition: string;
  origin: string;
  material: string;
  main_image?: imageItem;
  images?: imageItem[];
  description: string;
};
export default Product;