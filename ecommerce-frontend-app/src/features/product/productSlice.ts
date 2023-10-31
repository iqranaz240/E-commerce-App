import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface ProductState {
  count: number
}

// Define the initial state using that type
const initialState: ProductState = {
  count: 0,
} as ProductState

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.product.count;

export default productSlice.reducer