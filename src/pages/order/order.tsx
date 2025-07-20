import { OrderItemDetails } from '@/components/order-item-details/order-item-details';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';

export const OrderPage = (): React.JSX.Element => {
	const { number } = useParams();

	return (
		<section className={styles.content}>
			<h1 className={`${styles.title} text text_type_digits-default`}>
				#{number}
			</h1>

			<OrderItemDetails />
		</section>
	);
};
