// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  rname: string;
  price: number;
  imgdata: string;
  qnty: number;
  total: number;
}

interface CartState {
  carts: CartItem[];
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.carts[itemIndex].qnty += 1;
      } else {
        state.carts.push({ ...action.payload, qnty: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemIndex = state.carts.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0 && state.carts[itemIndex].qnty > 1) {
        state.carts[itemIndex].qnty -= 1;
      } else {
        state.carts = state.carts.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addCartItem, removeCartItem, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
