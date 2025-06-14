import React, { UIEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectGroupedIngredients } from '@/services/ingredients/selectors';
import { EIngredientType } from '@/utils/enums';
import { tabs } from '@/utils/const';
import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { IngredientsList } from './ingredients-list/ingredients-list';

export const BurgerIngredients = (): React.JSX.Element => {
	const groupedIngredients = useSelector(selectGroupedIngredients);

	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	const isTabClick = useRef(false);

	const handleTabClick = (event: string) => {
		setActiveTab(event as EIngredientType);

		isTabClick.current = true;

		setTimeout(() => {
			isTabClick.current = false;
		}, 1000);
	};

	const handleScroll = (event: UIEvent<HTMLDivElement>) => {
		if (isTabClick.current) return;

		const containerTop = event.currentTarget.getBoundingClientRect().top;

		const sectionElements = Array.from(
			event.currentTarget.querySelectorAll('[data-type]')
		) as HTMLElement[];

		const closest = sectionElements.reduce((closest, current) => {
			const currentTop = current.getBoundingClientRect().top - containerTop;
			const closestTop = closest.getBoundingClientRect().top - containerTop;

			return Math.abs(currentTop) < Math.abs(closestTop) ? current : closest;
		});

		const newActive = closest.getAttribute('data-type') as EIngredientType;
		if (newActive !== activeTab) setActiveTab(newActive);
	};

	return (
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
	);
};
