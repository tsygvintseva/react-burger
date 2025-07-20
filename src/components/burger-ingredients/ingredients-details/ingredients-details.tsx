import styles from './ingredients-details.module.css';
import { useParams } from 'react-router-dom';

import { selectIngredientById } from '@/services/ingredients/selectors';
import { useSelector } from '@/utils/types';

export const IngredientsDetails = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useSelector(selectIngredientById(id!));

	const nutrition = [
		{
			key: 'Калории, ккал',
			value: ingredient?.calories,
		},
		{
			key: 'Белки, г',
			value: ingredient?.proteins,
		},
		{
			key: 'Жиры, г',
			value: ingredient?.fat,
		},
		{
			key: 'Углеводы, г',
			value: ingredient?.carbohydrates,
		},
	];

	return (
		<div className={`${styles.content} pb-5`}>
			<img
				src={ingredient?.image_large}
				alt={`Так выглядит ${ingredient?.name}`}
			/>

			<p className='text text_type_main-medium mt-4 mb-8'>{ingredient?.name}</p>

			<table className={styles.nutrition}>
				<thead>
					<tr>
						{nutrition.map((item) => (
							<th
								key={item.key}
								className='text text_type_main-default text_color_inactive pr-5 pb-2'>
								{item.key}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{nutrition.map((item) => (
							<td
								key={item.key}
								className='text text_type_digits-default text_color_inactive pr-5'>
								{item.value}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};
