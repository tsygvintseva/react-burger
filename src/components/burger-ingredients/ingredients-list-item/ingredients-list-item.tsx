import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '@/utils/types';
import styles from './ingredients-list-item.module.css';

type TIngredientsItemProps = {
	counter: number;
	ingredient: TIngredient;
};

export const IngredientsListItem = ({
	counter,
	ingredient,
}: TIngredientsItemProps): React.JSX.Element => {
	const location = useLocation();

	const [{ opacity }, ref] = useDrag({
		type: 'ingredients',
		item: ingredient,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	return (
		<li className={`${styles.ingredient}`} ref={ref} style={{ opacity }}>
			<Link
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}
				className={styles.link}>
				{!!counter && (
					<Counter count={counter} size='default' extraClass='m-1' />
				)}

				<img
					className='ml-4 mr-4'
					alt={`Так выглядит ${ingredient.name}`}
					src={ingredient.image}
				/>
				<p className={`${styles.price} mt-2 mb-2`}>
					<span className='text text_type_digits-default'>
						{ingredient.price}
					</span>
					<CurrencyIcon type='primary' />
				</p>

				<h3 className={`${styles.name} text text_type_main-default`}>
					{ingredient.name}
				</h3>
			</Link>
		</li>
	);
};
