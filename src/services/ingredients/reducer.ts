import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@/utils/types';
import { EIngredientType } from '@/utils/enums';

export type TGroupedIngredients = Partial<
	Record<EIngredientType, TIngredient[]>
>;

interface IngredientsState {
	map: Record<string, TIngredient>;
	grouped: TGroupedIngredients;
}

const initialState: IngredientsState = {
	map: {},
	grouped: {},
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredientsData: (state, action: PayloadAction<TIngredient[]>) => {
			const map: Record<string, TIngredient> = {};
			const grouped: TGroupedIngredients = {};

			for (const ingredient of action.payload) {
				map[ingredient._id] = ingredient;

				if (grouped[ingredient.type]) {
					grouped[ingredient.type]!.push(ingredient);
				} else {
					grouped[ingredient.type] = [ingredient];
				}
			}

			state.map = map;
			state.grouped = grouped;
		},
	},
});

export const { setIngredientsData } = ingredientsSlice.actions;
