import { TIngredientUniq } from '@/utils/types';
import { ConstructorListItem } from '../constructor-list-item/constructor-list-item';
import styles from './constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { moveIngredient } from '@/services/constructor-data/reducer';

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
			{first && (
				<ConstructorElement
					type='top'
					isLocked={true}
					text={first.name}
					price={first.price}
					thumbnail={first.image}
					extraClass={styles.bun}
				/>
			)}

			<ul className={`${styles.list} mt-4 mb-4`}>
				{ingredients
					.map((item, i) => ({ item, i }))
					.filter(({ i }) => i !== 0 && i !== ingredients.length - 1)
					.map(({ item, i }) => renderCard(item, i))}
			</ul>

			{last && (
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={last.name}
					price={last.price}
					thumbnail={last.image}
					extraClass={styles.bun}
				/>
			)}
		</>
	);
};
