import { combineReducers, Reducer } from "redux";
import cartReducer from "./cartSlice";
import productReducer from './productSlice';
import userReducer from './userSlice';

// Define the type for the state managed by the 'cartReducer'
export interface RootState {
  cartReducer: ReturnType<typeof cartReducer>,
  productReducer: ReturnType<typeof productReducer>,
  userReducer: ReturnType<typeof userReducer>,
}

const rootReducer: Reducer<RootState> = combineReducers({
  cartReducer,
  productReducer,
  userReducer,
});

export default rootReducer;
