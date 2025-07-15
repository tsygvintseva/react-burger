import { TWSOrder, useSelector } from '@/utils/types';
import styles from './order-item.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';

export const OrderItem = ({
	order,
}: {
	order: TWSOrder;
}): React.JSX.Element => {
	const ingredientMap = useSelector((state) => state.ingredients.map);

	const images = useMemo(() => {
		return order.ingredients.map((id) => {
			const item = ingredientMap[id];
			return {
				alt: item?.name ?? '',
				path: item?.image_mobile ?? '',
			};
		});
	}, [order.ingredients, ingredientMap]);

	const price = useMemo(() => {
		return order.ingredients.reduce((sum, id) => {
			const item = ingredientMap[id];
			return item ? sum + item.price : sum;
		}, 0);
	}, [order.ingredients, ingredientMap]);

	return (
		<div className={`${styles.card} p-5`}>
			<div className={styles.header}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<FormattedDate
					date={new Date(order.createdAt)}
					className='text text_type_main-default text_color_inactive'
				/>
			</div>
			<p className='text text_type_main-medium'>{order.name}</p>

			<div className={styles.footer}>
				<div className={styles.imageWrapper}>
					{images.map((item, index) => (
						<div
							key={index}
							className={styles.stroke}
							style={{ zIndex: images.length - index }}>
							<div className={`${styles.image}`}>
								<img className='' alt={item.alt} src={item.path} />
							</div>
						</div>
					))}
				</div>

				<p className={`${styles.price} text text_type_digits-default`}>
					{price}
					<CurrencyIcon type='primary' />
				</p>
			</div>
		</div>
	);
};
