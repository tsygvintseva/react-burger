import { TWSOrder, useSelector } from '@/utils/types';
import styles from './order-item.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EOrderStatus } from '@/utils/enums';

const orderStatusMap: Record<EOrderStatus, string> = {
	[EOrderStatus.Done]: 'Выполнен',
	[EOrderStatus.Pending]: 'Готовится',
	[EOrderStatus.Created]: 'Создан',
};

export const OrderItem = ({
	order,
	withStatus = false,
}: {
	order: TWSOrder;
	withStatus?: boolean;
}): React.JSX.Element => {
	const ingredientMap = useSelector((state) => state.ingredients.map);
	const location = useLocation();

	const images = useMemo(() => {
		return order.ingredients.slice(0, 8).map((id) => {
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
		<Link
			to={`/feed/${order.number}`}
			className={`${styles.card} p-5`}
			state={{ background: location }}>
			<div className={styles.header}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<FormattedDate
					date={new Date(order.createdAt)}
					className='text text_type_main-default text_color_inactive'
				/>
			</div>
			<p className='text text_type_main-medium'>
				{order.name}

				{withStatus && (
					<span
						className={`${styles.status} ${order.status === EOrderStatus.Done ? `${styles.done}` : ''} text text_type_main-small mt-2`}>
						{orderStatusMap[order.status]}
					</span>
				)}
			</p>

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
		</Link>
	);
};
