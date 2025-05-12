import { useEffect, useRef } from 'react';
import styles from './ingredients-list.module.css';

import { EIngredientType } from '@/utils/enums';
import { TIngredient } from '@/utils/types';

import { IngredientsListItem } from '../ingredients-list-item/ingredients-list-item';

type TIngredientsListProps = {
	ingredients: TIngredient[];
	orderList: TIngredient[];
	type: EIngredientType;
	activeTab: string;
	selectIngredient: (ingredient: TIngredient) => void;
};

export const IngredientsList = ({
	ingredients,
	orderList,
	type,
	activeTab,
	selectIngredient,
}: TIngredientsListProps): React.JSX.Element => {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (sectionRef.current && activeTab === type) {
			sectionRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [activeTab, type]);

	const getListName = (type: EIngredientType): string => {
		switch (type) {
			case EIngredientType.Main:
				return 'Начинки';
			case EIngredientType.Sauce:
				return 'Соусы';
			default:
				return 'Булки';
		}
	};

	const getCountInOrder = (item: TIngredient) => {
		const counter = orderList.filter((row) => row._id === item._id).length;

		return counter ?? 0;
	};

	return (
		<section ref={sectionRef}>
			<h2 className='text text_type_main-medium'>{getListName(type)}</h2>
			<ul className={`${styles.list} pl-4`}>
				{ingredients.map((item) => (
					<IngredientsListItem
						key={item._id}
						ingredient={item}
						counter={getCountInOrder(item)}
						selectIngredient={selectIngredient}
					/>
				))}
			</ul>
		</section>
	);
};
