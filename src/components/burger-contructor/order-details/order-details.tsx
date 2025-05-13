import { Modal } from '@/components/modal/modal';
import doneImage from '@/images/done.png';
import styles from './order-details.module.css';

type TOrderDetailsProps = {
	onClose: () => void;
};

export const OrderDetails = ({
	onClose,
}: TOrderDetailsProps): React.JSX.Element => {
	return (
		<Modal onClose={onClose}>
			<div className={`${styles.content} pt-4 pb-20`}>
				<p className={`${styles.number} text text_type_digits-large mb-8`}>
					034536
				</p>

				<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>

				<img src={doneImage} alt='Заказ подтвержден' />

				<p
					className={`${styles.description} text text_type_main-default mt-15`}>
					Ваш заказ начали готовить
					<span className='text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</span>
				</p>
			</div>
		</Modal>
	);
};
