import { Modal } from '@/components/modal/modal';
import { TIngredient } from '@/utils/types';
import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
	details: TIngredient;
	onClose: () => void;
};

export const IngredientDetails = ({
	details,
	onClose,
}: TIngredientDetailsProps): React.JSX.Element => {
	const nutrition = [
		{
			key: 'Калории, ккал',
			value: '244,4',
		},
		{
			key: 'Белки, г',
			value: '12,2',
		},
		{
			key: 'Жиры, г',
			value: '17,2',
		},
		{
			key: 'Углеводы, г',
			value: '10,2',
		},
	];

	return (
		<Modal title='Детали ингредиента' onClose={onClose}>
			<div className={`${styles.content} pb-5`}>
				<img src={details.image_large} alt={`Так выглядит ${details.name}`} />

				<p className='text text_type_main-medium mt-4 mb-8'>{details.name}</p>

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
		</Modal>
	);
};
