import { useGetPublicOrdersQuery } from '@/services/orders-soket/api';
import styles from './feed.module.css';
import { OrderItem } from '@/components/order-item/order-item';
import { EOrderStatus, EWSConnectionStatus } from '@/utils/enums';
import { useMemo } from 'react';
import { useSelector } from '@/utils/types';
import { Preloader } from '@/components/preloader/preloader';

export const FeedPage = (): React.JSX.Element => {
	const wsStatus = useSelector((state) => state.wsStatusSlice);
	const { data } = useGetPublicOrdersQuery();

	const doneOrders = useMemo(() => {
		return (
			data?.orders
				.filter((item) => item.status === EOrderStatus.Done)
				.slice(0, 10) ?? []
		);
	}, [data?.orders]);

	const pendingOrders = useMemo(() => {
		return (
			data?.orders
				.filter((item) => item.status === EOrderStatus.Pending)
				.slice(0, 10) ?? []
		);
	}, [data?.orders]);

	return (
		<section className={styles.feed}>
			{wsStatus === EWSConnectionStatus.Connecting ||
			wsStatus === EWSConnectionStatus.Open ? (
				<div className={styles.preloader}>
					<Preloader />
				</div>
			) : (
				<>
					<h1 className='text text_type_main-large mt-10 mb-5'>
						Лента заказов
					</h1>

					<div className={styles.content}>
						<section className={`${styles.list} custom-scroll`}>
							{data?.orders.map((item) => (
								<OrderItem key={item.number} order={item} />
							))}
						</section>
						<section className={styles.info}>
							<section className={styles.status}>
								<div>
									{!!doneOrders.length && (
										<>
											<h3 className='text text_type_main-medium'>Готовы:</h3>
											<div className={styles.statusList}>
												{doneOrders.map((item, index) => (
													<p
														key={index}
														className={`${styles.done} text text_type_digits-default`}>
														{item.number}
													</p>
												))}
											</div>
										</>
									)}
								</div>

								<div>
									{!!pendingOrders.length && (
										<>
											<h3 className='text text_type_main-medium'>В работе:</h3>
											<div className={styles.statusList}>
												{pendingOrders.map((item, index) => (
													<p
														key={index}
														className='text text_type_digits-default'>
														{item.number}
													</p>
												))}
											</div>
										</>
									)}
								</div>
							</section>
							<div>
								<h3 className='text text_type_main-medium'>
									Выполнено за все время:
								</h3>
								<span className={`${styles.count} text text_type_digits-large`}>
									{data?.total}
								</span>
							</div>
							<div>
								<h3 className='text text_type_main-medium'>
									Выполнено за сегодня:
								</h3>
								<span className={`${styles.count} text text_type_digits-large`}>
									{data?.totalToday}
								</span>
							</div>
						</section>
					</div>
				</>
			)}
		</section>
	);
};
