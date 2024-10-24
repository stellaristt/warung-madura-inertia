import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterProducts: <T extends { product_name: string }>(products: T[]) => T[];
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  filterProducts: (products) => {
    const query = get().searchQuery.toLowerCase().trim();
    if (!query) return products;

    return products.filter(product =>
      product.product_name.toLowerCase().includes(query)
    );
  }
}));
