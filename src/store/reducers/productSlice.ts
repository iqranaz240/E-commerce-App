import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cardsdata from '../../CardsData';

export interface ProductItem {
  id: number;
  rname: string;
  price: number;
  imgdata: string;
  qnty: number;
}

interface ProductState {
  products: ProductItem[];
}

const initialState: ProductState = {
  products: Cardsdata,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProductItem: (state, action: PayloadAction<ProductItem>) => {
      const itemIndex = state.products.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.products[itemIndex].qnty += 1;
      } else {
        state.products.push({ ...action.payload, qnty: 1 });
      }
    },
    removeProductItem: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemIndex = state.products.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0 && state.products[itemIndex].qnty > 1) {
        state.products[itemIndex].qnty -= 1;
      } else {
        state.products = state.products.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addProductItem, removeProductItem, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer;
