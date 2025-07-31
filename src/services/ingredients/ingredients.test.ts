import { describe, it, expect } from 'vitest';

import { EIngredientType } from '@/utils/enums';
import { TIngredient } from '@/utils/types';
import { ingredientsSlice, setIngredientsData } from './reducer';

const mockIngredients: TIngredient[] = [
	{
		_id: '1',
		name: 'Булка 1',
		type: EIngredientType.Bun,
		proteins: 10,
		fat: 5,
		carbohydrates: 20,
		calories: 200,
		price: 100,
		image: '',
		image_large: '',
		image_mobile: '',
	},
	{
		_id: '2',
		name: 'Соус 1',
		type: EIngredientType.Sauce,
		proteins: 0,
		fat: 1,
		carbohydrates: 2,
		calories: 30,
		price: 10,
		image: '',
		image_large: '',
		image_mobile: '',
	},
];

describe('ingredientsSlice', () => {
	const initialState = ingredientsSlice.getInitialState();

	it('should return the initial state', () => {
		expect(initialState).toEqual({
			map: {},
			grouped: {},
		});
	});

	it('should handle setIngredientsData', () => {
		const state = ingredientsSlice.reducer(
			initialState,
			setIngredientsData(mockIngredients)
		);

		expect(Object.keys(state.map)).toHaveLength(2);
		expect(state.map['1'].name).toBe('Булка 1');
		expect(state.map['2'].name).toBe('Соус 1');
		expect(state.grouped[EIngredientType.Bun]).toHaveLength(1);
		expect(state.grouped[EIngredientType.Sauce]).toHaveLength(1);
	});
});
