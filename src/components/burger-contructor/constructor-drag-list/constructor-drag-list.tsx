import { ConstructorDragListItem } from '../constructor-drag-list-item/constructor-drag-list-item';
import { TBurgerConstructorProps } from '../burger-constructor';

import styles from './constructor-drag-list.module.css';

export const ConstructorDragList = ({
	ingredients,
	handleClose,
}: TBurgerConstructorProps): React.JSX.Element => {
	return (
		<ul className={`${styles.list} mt-4 mb-4`}>
			{ingredients.map((item, index) => (
				<ConstructorDragListItem
					key={index}
					ingredient={item}
					handleClose={() => handleClose(index)}
				/>
			))}
		</ul>
	);
};
