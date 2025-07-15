import { RootState, TIngredient } from '@/utils/types';

export const selectGroupedIngredients = (state: RootState) =>
	state.ingredients.grouped;

export const selectIngredientById =
	(id: string) =>
	(state: RootState): TIngredient | undefined =>
		state.ingredients.map[id];
