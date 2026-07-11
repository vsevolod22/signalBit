import { create } from 'zustand';

interface ProductCarouselState {
  activeProductIndex: number;
  selectProduct: (index: number) => void;
}

export const useProductCarouselStore = create<ProductCarouselState>((set) => ({
  activeProductIndex: 1,
  selectProduct: (index) => set({ activeProductIndex: index }),
}));
