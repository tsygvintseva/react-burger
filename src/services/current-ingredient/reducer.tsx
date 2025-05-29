import { TIngredient } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentIngredientState {
	currentIngredient: TIngredient | null;
	hoveredIngredientId: string | null;
}

const initialState: CurrentIngredientState = {
	currentIngredient: null,
	hoveredIngredientId: null,
};

export const currentIngredientSlice = createSlice({
	name: 'currentIngredient',
	initialState,
	selectors: {
		getCurrentIngredient: (state) => state.currentIngredient,
		getHoveredIngredientId: (state) => state.hoveredIngredientId,
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
export const { getCurrentIngredient, getHoveredIngredientId } =
	currentIngredientSlice.selectors;
