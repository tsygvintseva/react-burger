import { Preloader } from '@/components/preloader/preloader';
import {
	useGetPublicOrdersQuery,
	useGetUserOrdersQuery,
} from '@/services/orders-soket/api';
import { useLazyGetOrderByNumberQuery } from '@/services/orders/api';
import { TIngredient, TWSOrder, useSelector } from '@/utils/types';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order-item-details.module.css';
import { EOrderStatus } from '@/utils/enums';
import { orderStatusMap } from '../order-item/order-item';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { InrgedientImage } from '../inrgedient-image/inrgedient-image';

export const OrderItemDetails = (): React.JSX.Element => {
	const { number } = useParams();

	const { data: publicOrders } = useGetPublicOrdersQuery();
	const { data: userOrders } = useGetUserOrdersQuery();

	const [getOrder] = useLazyGetOrderByNumberQuery();
	const ingredientMap = useSelector((state) => state.ingredients.map);

	const [currentOrder, setCurrentOrder] = useState<TWSOrder | null>(null);

	const socketOrder = useMemo(() => {
		return (
			publicOrders?.orders.find((item) => item.number === +number!) ||
			userOrders?.orders.find((item) => item.number === +number!) ||
			null
		);
	}, [publicOrders, userOrders, number]);

	useEffect(() => {
		if (socketOrder) {
			setCurrentOrder(socketOrder);

			return;
		}
		getOrder(number!)
			.unwrap()
			.then((data) => {
				const order = data.orders.find((item) => item.number === +number!);

				if (order) setCurrentOrder(order);
			});
	}, [socketOrder, number]);

	const price = useMemo(() => {
		return currentOrder?.ingredients.reduce((sum, id) => {
			const item = ingredientMap[id];
			return item ? sum + item.price : sum;
		}, 0);
	}, [currentOrder?.ingredients, ingredientMap]);

	const groupedIngredients = useMemo(() => {
		return currentOrder?.ingredients.reduce(
			(prev, id) => {
				const row = ingredientMap[id];
				if (!row) return prev;

				const existing = prev.find((i) => i.row._id === id);

				if (existing) existing.count += 1;
				else prev.push({ row, count: 1 });

				return prev;
			},
			[] as { row: TIngredient; count: number }[]
		);
	}, [currentOrder?.ingredients, ingredientMap]);

	return (
		<>
			{!currentOrder ? (
				<Preloader />
			) : (
				<>
					<h2 className='text text_type_main-medium mt-5'>
						{currentOrder.name}
					</h2>
					<span
						className={`${styles.status} ${currentOrder.status === EOrderStatus.Done ? `${styles.done}` : ''} text text_type_main-small mt-2`}>
						{orderStatusMap[currentOrder.status]}
					</span>

					<div className='mt-15 mb-10'>
						<p className='text text_type_main-medium'>Состав:</p>
						<ul className={`${styles.list} custom-scroll`}>
							{groupedIngredients!.map((item, index) => (
								<li key={index}>
									<div className={styles.ingredientInfo}>
										<InrgedientImage
											alt={item.row.name}
											src={item.row.image_mobile}
										/>
										<p className='text text_type_main-small'>{item.row.name}</p>
									</div>

									<p
										className={`${styles.price} text text_type_digits-default`}>
										{item.count} x {item.row.price}
										<CurrencyIcon type='primary' />
									</p>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.footer}>
						<FormattedDate
							date={new Date(currentOrder.createdAt)}
							className='text text_type_main-default text_color_inactive'
						/>
						<p className={`${styles.price} text text_type_digits-default`}>
							{price}
							<CurrencyIcon type='primary' />
						</p>
					</div>
				</>
			)}
		</>
	);
};
