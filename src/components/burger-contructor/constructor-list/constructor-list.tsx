import { TIngredientUniq } from '@/utils/types';
import { ConstructorListItem } from '../constructor-list-item/constructor-list-item';
import styles from './constructor-list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export type TConstructorListProps = {
	ingredients: TIngredientUniq[];
	onClose: (key: string) => void;
};

export const ConstructorList = ({
	ingredients,
	onClose,
}: TConstructorListProps): React.JSX.Element => {
	const first = ingredients[0];
	const last = ingredients[ingredients.length - 1];
	const middle = ingredients.slice(1, -1);

	return (
		<>
			{first && (
				<ConstructorElement
					type='top'
					isLocked={true}
					text={first.name}
					price={first.price}
					thumbnail={first.image}
				/>
			)}

			<ul className={`${styles.list} mt-4 mb-4`}>
				{middle.map((item) => (
					<ConstructorListItem
						key={item.key}
						ingredient={item}
						handleClose={() => onClose(item.key)}
					/>
				))}
			</ul>

			{last && (
				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={last.name}
					price={last.price}
					thumbnail={last.image}
				/>
			)}
		</>
	);
};
