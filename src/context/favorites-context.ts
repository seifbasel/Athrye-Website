import { MOCK_FAVORITE_ITEMS } from "@/mocks/favorites";
import type { FavoriteItem } from "@/types/favourites";

export type FavoritesContextValue = {
  items: FavoriteItem[];
  removeItem: (id: string) => void;
  clearAll: () => void;
  toggleItem: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
};

export function useFavorites(): FavoritesContextValue {
  return {
    items: MOCK_FAVORITE_ITEMS,
    removeItem: (_id) => undefined,
    clearAll: () => undefined,
    toggleItem: (_item) => undefined,
    isFavorite: (id) => MOCK_FAVORITE_ITEMS.some((item) => item.id === id),
  };
}
