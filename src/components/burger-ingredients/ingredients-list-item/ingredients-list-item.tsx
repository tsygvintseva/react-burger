import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '@/utils/types';
import styles from './ingredients-list-item.module.css';
import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '@/services/current-ingredient/reducer';
import { addIngredient } from '@/services/constructor-data/reducer';

type TIngredientsItemProps = {
	counter: number;
	ingredient: TIngredient;
	selectIngredient: () => void;
};

export const IngredientsListItem = ({
	counter,
	ingredient,
	selectIngredient,
}: TIngredientsItemProps): React.JSX.Element => {
	const dispatch = useDispatch();

	const handleSelectIngredient = () => {
		dispatch(setCurrentIngredient(ingredient));
		dispatch(addIngredient(ingredient));

		selectIngredient();
	};

	return (
		<>
			<li className={styles.ingredient}>
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

				<button
					className={styles.ingredient_button}
					onClick={handleSelectIngredient}></button>
			</li>
		</>
	);
};
