import { TIngredient } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentIngredientState {
	currentIngredient: TIngredient | null;
}

const initialState: CurrentIngredientState = {
	currentIngredient: null,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	selectors: {
		getCurrentIngredient: (state) => state.currentIngredient,
	},
	reducers: {
		setCurrentIngredient: {
			reducer: (state, action: PayloadAction<TIngredient>) => {
				state.currentIngredient = action.payload;
			},
			prepare: (ingredient) => {
				return {
					payload: { ...ingredient },
				};
			},
		},
	},
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;
export const { getCurrentIngredient } = currentIngredientSlice.selectors;
