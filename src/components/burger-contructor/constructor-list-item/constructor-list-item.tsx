import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredientUniq } from '@utils/types.ts';
import styles from './constructor-list-item.module.css';

type TConstructorListItemProps = {
	ingredient: TIngredientUniq;
	index: number;
	handleClose: () => void;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem {
	index: number;
	id: string;
	type: string;
}

export const ConstructorListItem = ({
	ingredient,
	index,
	handleClose,
	moveCard,
}: TConstructorListItemProps): React.JSX.Element => {
	const ref = useRef<HTMLLIElement>(null);

	const [{ isDragging }, drag] = useDrag({
		type: 'element',
		item: () => {
			return { id: ingredient.key, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ handlerId }, drop] = useDrop<
		DragItem,
		unknown,
		{ handlerId: string | symbol | null }
	>({
		accept: 'element',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

			moveCard(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
		drop() {},
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<li
			ref={ref}
			style={{ opacity }}
			className={styles.ingredient}
			data-handler-id={handlerId}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleClose}
			/>
		</li>
	);
};
