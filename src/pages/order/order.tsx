import { OrderItemDetails } from '@/components/order-item/order-item-details/order-item-details';
import styles from './order.module.css';

export const OrderPage = (): React.JSX.Element => {
	return (
		<div className={styles.content}>
			<h1 className='text text_type_main-large mt-10 mb-5 pl-5'>
				Детали Заказа
			</h1>
			<OrderItemDetails />
		</div>
	);
};
