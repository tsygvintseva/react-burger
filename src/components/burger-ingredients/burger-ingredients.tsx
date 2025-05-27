import React, { useState } from 'react';

import { EIngredientType } from '@/utils/enums';
import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { IngredientsList } from './ingredients-list/ingredients-list';
import { useModalVisible } from '@/hooks/use-modal-visible';
import { useSelector } from 'react-redux';
import { getCurrentIngredient } from '@/services/current-ingredient/reducer';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { Preloader } from '../preloader/preloader';
import { selectGroupedIngredients } from '@/services/ingredients/selectors';
import { tabs } from '@/utils/const';

export const BurgerIngredients = (): React.JSX.Element => {
	const { isLoading } = useGetIngredientsQuery();

	const groupedIngredients = useSelector(selectGroupedIngredients);
	const ingredient = useSelector(getCurrentIngredient);

	const [isOpen, open, close] = useModalVisible(false);
	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	const handleTabClick = (event: string) => {
		setActiveTab(event as EIngredientType);
	};

	return (
		<>
			{isLoading ? (
				<Preloader />
			) : (
				<section className={styles.ingredients}>
					<IngredientsMenu
						tabs={tabs}
						activeTab={activeTab}
						setActiveTab={handleTabClick}
					/>

					<div
						className={`${styles.ingredients_list} mt-10 mb-10 custom-scroll`}>
						{Object.entries(groupedIngredients).map(([type, items]) => (
							<IngredientsList
								key={type}
								ingredients={items}
								type={type as EIngredientType}
								activeTab={activeTab}
								selectIngredient={open}
							/>
						))}
					</div>
				</section>
			)}

			{isOpen && <IngredientDetails details={ingredient!} onClose={close} />}
		</>
	);
};
