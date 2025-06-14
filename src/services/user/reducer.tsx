import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	user: {
		email: string;
		name: string;
	} | null;
	isAuthChecked: boolean;
}

const initialState: UserState = {
	user: null,
	isAuthChecked: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUser: (state) => state.user,
	},
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;
