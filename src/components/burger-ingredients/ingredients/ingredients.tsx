import { useMemo } from 'react';
import styles from './ingredients.module.css';

import { EIngredientType } from '@/utils/enums';
import { TIngredient } from '@/utils/types';

import { IngredientsList } from '../ingredients-list/ingredients-list';

type TIngredientsProps = {
	ingredients: TIngredient[];
	orderList: TIngredient[];
	activeTab: string;
	types: string[];
	selectIngredient: (ingredient: TIngredient) => void;
};

type TGroupedIngredients = Partial<Record<EIngredientType, TIngredient[]>>;

export const Ingredients = ({
	ingredients,
	orderList,
	activeTab,
	types,
	selectIngredient,
}: TIngredientsProps): React.JSX.Element => {
	const groupedIngredients = useMemo(() => {
		const grouped = ingredients.reduce((acc, ingredient) => {
			const { type } = ingredient;
			(acc[type] ||= []).push(ingredient);

			return acc;
		}, {} as TGroupedIngredients);

		return types.reduce((acc, type) => {
			acc[type as EIngredientType] = grouped[type as EIngredientType] ?? [];

			return acc;
		}, {} as TGroupedIngredients);
	}, [ingredients, types]);

	return (
		<div className={`${styles.ingredients} mt-10 mb-10 custom-scroll`}>
			{Object.entries(groupedIngredients).map(([type, items]) => (
				<IngredientsList
					key={type}
					ingredients={items}
					orderList={orderList}
					type={type as EIngredientType}
					activeTab={activeTab}
					selectIngredient={selectIngredient}
				/>
			))}
		</div>
	);
};
