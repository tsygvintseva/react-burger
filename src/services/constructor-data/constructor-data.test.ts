import { describe, it, expect, beforeEach } from 'vitest';

import { EIngredientType } from '@/utils/enums';
import { TIngredientUniq } from '@/utils/types';
import {
	addIngredient,
	clearConstructorData,
	constructorDataSlice,
	moveIngredient,
	removeIngredient,
} from './reducer';

const mockIngredient: TIngredientUniq = {
	key: 'sauce',
	_id: '1',
	name: 'Тестовый соус',
	type: EIngredientType.Sauce,
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 100,
	price: 50,
	image: '',
	image_mobile: '',
	image_large: '',
};

describe('constructorDataSlice', () => {
	let initialState: ReturnType<typeof constructorDataSlice.getInitialState>;

	beforeEach(() => {
		initialState = constructorDataSlice.getInitialState();
	});

	it('should return the initial state', () => {
		expect(initialState).toEqual({ constructorData: [] });
	});

	it('should handle addIngredient with bun', () => {
		const bun = {
			...mockIngredient,
			type: EIngredientType.Bun,
			name: 'Тестовая булка',
		};

		const nextState = constructorDataSlice.reducer(
			initialState,
			addIngredient(bun)
		);

		expect(nextState.constructorData.length).toBe(2);
		expect(nextState.constructorData[0].name).toContain('(верх)');
		expect(nextState.constructorData[1].name).toContain('(низ)');
	});

	it('should handle addIngredient with non-bun', () => {
		const nonBun = {
			...mockIngredient,
			type: EIngredientType.Main,
			name: 'Тестовая начинка',
		};

		// Когда булки нет — должен добавиться в конец
		const stateWithoutBun = { constructorData: [] };
		const resultWithoutBun = constructorDataSlice.reducer(
			stateWithoutBun,
			addIngredient(nonBun)
		);

		expect(resultWithoutBun.constructorData).toHaveLength(1);
		expect(resultWithoutBun.constructorData[0].name).toBe('Тестовая начинка');

		// Когда булка есть — должен вставиться перед нижней булкой
		const bunTop = {
			...mockIngredient,
			key: 'top',
			type: EIngredientType.Bun,
			name: 'Булка (верх)',
		};

		const bunBottom = {
			...mockIngredient,
			key: 'bottom',
			type: EIngredientType.Bun,
			name: 'Булка (низ)',
		};

		const stateWithBun = {
			constructorData: [bunTop, bunBottom],
		};

		const resultWithBun = constructorDataSlice.reducer(
			stateWithBun,
			addIngredient(nonBun)
		);

		expect(resultWithBun.constructorData).toHaveLength(3);
		expect(resultWithBun.constructorData[1].name).toBe('Тестовая начинка');
		expect(resultWithBun.constructorData[2].name).toBe('Булка (низ)');
	});

	it('should handle removeIngredient', () => {
		const state = {
			constructorData: [mockIngredient],
		};

		const nextState = constructorDataSlice.reducer(
			state,
			removeIngredient('sauce')
		);

		expect(nextState.constructorData).toHaveLength(0);
	});

	it('should handle moveIngredient', () => {
		const state = {
			constructorData: [
				{
					...mockIngredient,
					key: '1',
					name: 'Первый',
				},
				{
					...mockIngredient,
					key: '2',
					name: 'Второй',
				},
			],
		};

		const nextState = constructorDataSlice.reducer(
			state,
			moveIngredient({ dragIndex: 0, hoverIndex: 1 })
		);

		expect(nextState.constructorData[0].key).toBe('2');
		expect(nextState.constructorData[1].key).toBe('1');
	});

	it('should handle clearConstructorData', () => {
		const state = {
			constructorData: [mockIngredient],
		};

		const nextState = constructorDataSlice.reducer(
			state,
			clearConstructorData()
		);

		expect(nextState.constructorData).toEqual([]);
	});
});
