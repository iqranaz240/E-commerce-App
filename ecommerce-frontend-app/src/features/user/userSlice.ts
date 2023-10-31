import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface UserState {
  login: boolean
}

// Define the initial state using that type
const initialState: UserState = {
  login: false,
} as UserState

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.login = true
    },
    logout: (state) => {
      state.login = false
    },
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.login

export default userSlice.reducer