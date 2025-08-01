import { useCallback } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { moveIngredient } from '@/services/constructor-data/reducer';
import { TIngredientUniq, useDispatch } from '@/utils/types';
import { ConstructorListItem } from '../constructor-list-item/constructor-list-item';
import styles from './constructor-list.module.css';
import { EIngredientType } from '@/utils/enums';

export type TConstructorListProps = {
	ingredients: TIngredientUniq[];
	onClose: (key: string) => void;
};

export const ConstructorList = ({
	ingredients,
	onClose,
}: TConstructorListProps): React.JSX.Element => {
	const dispatch = useDispatch();

	const first = ingredients[0];
	const middle =
		first && first.type === EIngredientType.Bun
			? ingredients.slice(1, -1)
			: ingredients;
	const last = ingredients[ingredients.length - 1];

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(moveIngredient({ dragIndex, hoverIndex }));
		},
		[dispatch]
	);

	const renderCard = useCallback(
		(item: TIngredientUniq, index: number) => {
			return (
				<ConstructorListItem
					key={item.key}
					ingredient={item}
					index={index}
					handleClose={() => onClose(item.key)}
					moveCard={moveCard}
				/>
			);
		},
		[onClose, moveCard]
	);

	return (
		<>
			{first && first.type === EIngredientType.Bun && (
				<div data-testid='constructor-item'>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={first.name}
						price={first.price}
						thumbnail={first.image}
						extraClass={styles.bun}
					/>
				</div>
			)}

			<ul className={`${styles.list} mt-4 mb-4`}>
				{middle.map((item, i) => renderCard(item, i + 1))}
			</ul>

			{last && last.type === EIngredientType.Bun && (
				<div data-testid='constructor-item'>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={last.name}
						price={last.price}
						thumbnail={last.image}
						extraClass={styles.bun}
					/>
				</div>
			)}
		</>
	);
};
