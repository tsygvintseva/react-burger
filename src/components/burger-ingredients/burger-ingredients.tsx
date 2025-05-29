import React, { UIEvent, useEffect, useState } from 'react';

import { EIngredientType } from '@/utils/enums';
import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { IngredientsList } from './ingredients-list/ingredients-list';
import { useModalVisible } from '@/hooks/use-modal-visible';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentIngredient,
	setCurrentIngredient,
} from '@/services/current-ingredient/reducer';
import { IngredientDetails } from './ingredient-details/ingredient-details';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { Preloader } from '../preloader/preloader';
import { selectGroupedIngredients } from '@/services/ingredients/selectors';
import { tabs } from '@/utils/const';

export const BurgerIngredients = (): React.JSX.Element => {
	const { isLoading } = useGetIngredientsQuery();
	const dispatch = useDispatch();

	const groupedIngredients = useSelector(selectGroupedIngredients);
	const ingredient = useSelector(getCurrentIngredient);
	const currentIngredient = useSelector(getCurrentIngredient);

	const [isOpen, open, close] = useModalVisible(false, {
		onClose: () => dispatch(setCurrentIngredient(null)),
	});

	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	useEffect(() => {
		if (currentIngredient) open();
	}, [currentIngredient]);

	const handleTabClick = (event: string) => {
		setActiveTab(event as EIngredientType);
	};

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		const containerTop = event.currentTarget.getBoundingClientRect().top;

		const sectionElements = Array.from(
			event.currentTarget.querySelectorAll('[data-type]')
		) as HTMLElement[];

		const closest = sectionElements.reduce((closestSoFar, current) => {
			const currentTop = current.getBoundingClientRect().top - containerTop;
			const closestTop =
				closestSoFar.getBoundingClientRect().top - containerTop;

			return Math.abs(currentTop) < Math.abs(closestTop)
				? current
				: closestSoFar;
		});

		const newActive = closest.getAttribute('data-type') as EIngredientType;
		if (newActive !== activeTab) setActiveTab(newActive);
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
						className={`${styles.ingredients_list} mt-10 mb-10 custom-scroll`}
						onScroll={handleScroll}>
						{Object.entries(groupedIngredients).map(([type, items]) => (
							<IngredientsList
								key={type}
								ingredients={items}
								type={type as EIngredientType}
								activeTab={activeTab}
							/>
						))}
					</div>
				</section>
			)}

			{isOpen && <IngredientDetails details={ingredient!} onClose={close} />}
		</>
	);
};
