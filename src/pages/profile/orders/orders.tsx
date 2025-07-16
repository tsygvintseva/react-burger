import { useGetUserOrdersQuery } from '@/services/orders-soket/api';
import styles from './orders.module.css';
import { OrderItem } from '@/components/order-item/order-item';
import { Preloader } from '@/components/preloader/preloader';
import { useSelector } from '@/utils/types';
import { EWSConnectionStatus } from '@/utils/enums';

export const OrdersPage = (): React.JSX.Element => {
	const wsStatus = useSelector((state) => state.wsStatusSlice);
	const { data } = useGetUserOrdersQuery();

	console.log(data);

	return (
		<>
			{wsStatus === EWSConnectionStatus.Connecting ||
			wsStatus === EWSConnectionStatus.Open ? (
				<Preloader />
			) : (
				<>
					{data?.orders.length ? (
						<section className={`${styles.list} custom-scroll`}>
							{data?.orders.map((item) => (
								<OrderItem key={item.number} order={item} withStatus={true} />
							))}
						</section>
					) : (
						<p
							className={`${styles.help} text text_type_main-default text_color_inactive`}>
							🚀 Ваша история заказов пуста.
							<br /> Скорее собирайте свой первый космо-бургер!
						</p>
					)}
				</>
			)}
		</>
	);
};
