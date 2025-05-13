import React, { useMemo, useState } from 'react';

import { TIngredient } from '@utils/types';
import { EIngredientType } from '@/utils/enums';
import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { IngredientsList } from './ingredients-list/ingredients-list';

type TBurgerIngredientsProps = {
	orderList: TIngredient[];
	ingredients: TIngredient[];
	selectIngredient: (ingredient: TIngredient) => void;
};

type TGroupedIngredients = Partial<Record<EIngredientType, TIngredient[]>>;

const tabs = [
	{
		value: EIngredientType.Bun,
		name: 'Булки',
	},
	{
		value: EIngredientType.Sauce,
		name: 'Соусы',
	},
	{
		value: EIngredientType.Main,
		name: 'Начинки',
	},
];

export const BurgerIngredients = ({
	orderList,
	ingredients,
	selectIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	const handleTabClick = (event: string) => {
		setActiveTab(event as EIngredientType);
	};

	const groupedIngredients = useMemo(() => {
		const result: TGroupedIngredients = {} as TGroupedIngredients;

		for (const { value: type } of tabs) {
			result[type as EIngredientType] = ingredients.filter(
				(ingredient) => ingredient.type === type
			);
		}

		return result;
	}, [ingredients]);

	return (
		<section className={styles.ingredients}>
			<IngredientsMenu
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={handleTabClick}
			/>

			<div className={`${styles.ingredients_list} mt-10 mb-10 custom-scroll`}>
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
		</section>
	);
};
