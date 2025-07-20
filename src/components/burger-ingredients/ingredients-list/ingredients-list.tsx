import { useEffect, useMemo, useRef } from 'react';

import { getConstructorData } from '@/services/constructor-data/reducer';
import { EIngredientType } from '@/utils/enums';
import { TIngredient, useSelector } from '@/utils/types';
import { IngredientsListItem } from '../ingredients-list-item/ingredients-list-item';
import styles from './ingredients-list.module.css';

type TIngredientsListProps = {
	type: EIngredientType;
	activeTab: string;
	ingredients: TIngredient[];
};

export const IngredientsList = ({
	type,
	activeTab,
	ingredients,
}: TIngredientsListProps): React.JSX.Element => {
	const constructorData = useSelector(getConstructorData);

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

	const counters = useMemo(() => {
		const counters: Record<string, number> = {};
		constructorData.forEach((item) => {
			counters[item._id] = (counters[item._id] || 0) + 1;
		});

		return counters;
	}, [constructorData]);

	return (
		<section ref={sectionRef}>
			<h2 className='text text_type_main-medium' data-type={type}>
				{getListName(type)}
			</h2>
			<ul className={`${styles.list} pl-4`}>
				{ingredients.map((item) => (
					<IngredientsListItem
						key={item._id}
						ingredient={item}
						counter={counters[item._id] ?? 0}
					/>
				))}
			</ul>
		</section>
	);
};
