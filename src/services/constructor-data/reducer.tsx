import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { EIngredientType } from '@/utils/enums';
import { TIngredient, TIngredientUniq } from '@/utils/types';

type ConstructorIngredient = TIngredientUniq;

interface ConstructorState {
	constructorData: ConstructorIngredient[];
}

const initialState: ConstructorState = {
	constructorData: [],
};

export const constructorDataSlice = createSlice({
	name: 'constructorData',
	initialState,
	selectors: {
		getConstructorData: (state) => state.constructorData,
	},
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<ConstructorIngredient[]>) => {
				const ingredients = action.payload;

				if (ingredients.length > 1) {
					const middleIngredients = state.constructorData.filter(
						(i) => i.type !== EIngredientType.Bun
					);
					const [topBun, bottomBun] = ingredients;

					state.constructorData = [topBun, ...middleIngredients, bottomBun];
				} else {
					const hasBun = state.constructorData[0]?.type === EIngredientType.Bun;

					if (hasBun) {
						state.constructorData.splice(
							state.constructorData.length - 1,
							0,
							ingredients[0]
						);
					} else {
						state.constructorData.push(ingredients[0]);
					}
				}
			},
			prepare: (ingredient: TIngredient) => {
				if (ingredient.type === EIngredientType.Bun) {
					const topBun: ConstructorIngredient = {
						...ingredient,
						key: nanoid(),
						name: `${ingredient.name} (верх)`,
					};
					const bottomBun: ConstructorIngredient = {
						...ingredient,
						key: nanoid(),
						name: `${ingredient.name} (низ)`,
					};

					return { payload: [topBun, bottomBun] };
				}

				return { payload: [{ ...ingredient, key: nanoid() }] };
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			const index = state.constructorData.findIndex(
				(i) => i.key === action.payload
			);

			state.constructorData.splice(index, 1);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const { dragIndex, hoverIndex } = action.payload;

			const ingredients = [...state.constructorData];
			const [draggedItem] = ingredients.splice(dragIndex, 1);

			ingredients.splice(hoverIndex, 0, draggedItem);

			state.constructorData = ingredients;
		},
		clearConstructorData: (state) => {
			state.constructorData = [];
		},
	},
});

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructorData,
} = constructorDataSlice.actions;
export const { getConstructorData } = constructorDataSlice.selectors;
