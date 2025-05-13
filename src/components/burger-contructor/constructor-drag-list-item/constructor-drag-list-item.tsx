import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '@utils/types.ts';
import styles from './constructor-drag-list-item.module.css';

type TConstructorDragListItemProps = {
	ingredient: TIngredient;
	handleClose: () => void;
};

export const ConstructorDragListItem = ({
	ingredient,
	handleClose,
}: TConstructorDragListItemProps): React.JSX.Element => {
	return (
		<li className={styles.ingredient}>
			<DragIcon type='primary' className={styles.icon} />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleClose}
			/>
		</li>
	);
};
