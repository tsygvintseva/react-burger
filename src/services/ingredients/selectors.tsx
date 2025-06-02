import { createSelector } from '@reduxjs/toolkit';

import { EIngredientType } from '@/utils/enums';
import { TIngredient } from '@/utils/types';
import { tabs } from '@/utils/const';
import { ingredientsApi } from './api';

type TGroupedIngredients = Partial<Record<EIngredientType, TIngredient[]>>;

export const selectGroupedIngredients = createSelector(
	ingredientsApi.endpoints.getIngredients.select(),
	(result): TGroupedIngredients => {
		const ingredients = result?.data;
		const grouped: TGroupedIngredients = {} as TGroupedIngredients;

		for (const { value: type } of tabs) {
			grouped[type as EIngredientType] =
				ingredients?.filter((item: TIngredient) => item.type === type) ?? [];
		}

		return grouped;
	}
);
