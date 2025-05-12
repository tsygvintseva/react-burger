import React, { useState } from 'react';

import { TIngredient } from '@utils/types';
import { EIngredientType } from '@/utils/enums';

import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { Ingredients } from './ingredients/ingredients';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
	orderList: TIngredient[];
	selectIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredients = ({
	ingredients,
	orderList,
	selectIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	const handlerTabClick = (event: string) => {
		setActiveTab(event as EIngredientType);
	};

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

	return (
		<section className={styles.ingredients}>
			<IngredientsMenu
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={handlerTabClick}
			/>

			<Ingredients
				ingredients={ingredients}
				orderList={orderList}
				types={tabs.map((item) => item.value)}
				activeTab={activeTab}
				selectIngredient={selectIngredient}
			/>
		</section>
	);
};
