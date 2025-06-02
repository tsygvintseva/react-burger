import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useModalVisible } from '@/hooks/use-modal-visible';
import {
	clearCurrentIngredient,
	getCurrentIngredient,
} from '@/services/current-ingredient/reducer';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { selectGroupedIngredients } from '@/services/ingredients/selectors';
import { EIngredientType } from '@/utils/enums';
import { tabs } from '@/utils/const';
import { Preloader } from '../preloader/preloader';
import styles from './burger-ingredients.module.css';
import { IngredientsMenu } from './ingredients-menu/ingredients-menu';
import { IngredientsList } from './ingredients-list/ingredients-list';
import { IngredientDetails } from './ingredient-details/ingredient-details';

export const BurgerIngredients = (): React.JSX.Element => {
	const { isLoading } = useGetIngredientsQuery();
	const dispatch = useDispatch();

	const groupedIngredients = useSelector(selectGroupedIngredients);
	const ingredient = useSelector(getCurrentIngredient);
	const currentIngredient = useSelector(getCurrentIngredient);

	const [isOpen, open, close] = useModalVisible(false, {
		onClose: () => dispatch(clearCurrentIngredient()),
	});

	const [activeTab, setActiveTab] = useState(EIngredientType.Bun);

	const isTabClick = useRef(false);

	useEffect(() => {
		if (currentIngredient) open();
	}, [currentIngredient, open]);

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
