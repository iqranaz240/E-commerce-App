import { combineReducers, Reducer } from "redux";
import cartReducer from "./cartSlice";
import productReducer from './productSlice';

// Define the type for the state managed by the 'cartReducer'
export interface RootState {
  cartReducer: ReturnType<typeof cartReducer>,
  productReducer: ReturnType<typeof productReducer>,
}

const rootReducer: Reducer<RootState> = combineReducers({
  cartReducer,
  productReducer,
});

export default rootReducer;
