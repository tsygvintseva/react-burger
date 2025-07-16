import { IngredientsDetails } from '@/components/burger-ingredients/ingredients-details/ingredients-details';
import styles from './ingredient.module.css';

export const IngredientPage = (): React.JSX.Element => {
	return (
		<div className={styles.content}>
			<h1 className='text text_type_main-large mt-10 mb-5 pl-5'>
				Детали ингредиента
			</h1>
			<IngredientsDetails />
		</div>
	);
};
