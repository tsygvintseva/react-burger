import { EIngredientType } from '@/utils/enums';
import { TIngredient, TIngredientUniq } from '@/utils/types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

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
			reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
				const ingredient = action.payload;

				if (ingredient.type === EIngredientType.Bun) {
					const middleIngredients = state.constructorData.filter(
						(i) => i.type !== EIngredientType.Bun
					);

					const topBun = {
						...ingredient,
						key: nanoid(),
						name: `${ingredient.name} (верх)`,
					};
					const bottomBun = {
						...ingredient,
						key: nanoid(),
						name: ` ${ingredient.name} (низ)`,
					};

					state.constructorData = [topBun, ...middleIngredients, bottomBun];
				} else {
					const topBun = state.constructorData[0];
					const bottomBun =
						state.constructorData[state.constructorData.length - 1];

					const hasBuns =
						topBun?.type === EIngredientType.Bun &&
						bottomBun?.type === EIngredientType.Bun &&
						state.constructorData.length >= 2;

					if (hasBuns) {
						state.constructorData.splice(
							state.constructorData.length - 1,
							0,
							ingredient
						);
					} else {
						state.constructorData.push(ingredient);
					}
				}
			},

			prepare: (ingredient: TIngredient) => ({
				payload: { ...ingredient, key: nanoid() },
			}),
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
	},
});

export const { addIngredient, removeIngredient, moveIngredient } =
	constructorDataSlice.actions;
export const { getConstructorData } = constructorDataSlice.selectors;
