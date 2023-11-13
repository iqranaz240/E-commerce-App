import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    login: boolean;
    password?: string;
}

interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        login: false,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            // Use the action.payload to update the user information
            state.user = action.payload;
        },
        signinUser: (state, action: PayloadAction<User>) => {
            // Check if the user is not already logged in and then update the user
            if (!state.user.login) {
                state.user = action.payload;
                state.user.login = true;
            }
        },
        logoutUser: (state, action: PayloadAction<boolean>) => {
            // Check if the user is logged in and then update the user
            if (state.user.login) {
                state.user.login = false;
            }
        },
    },
});

export const { addUser, signinUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
