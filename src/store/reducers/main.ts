import { combineReducers, Reducer } from "redux";
import cartReducer from "./cartSlice";

// Define the type for the state managed by the 'cartReducer'
export interface RootState {
  cartReducer: ReturnType<typeof cartReducer>;
}

const rootReducer: Reducer<RootState> = combineReducers({
  cartReducer,
});

export default rootReducer;
