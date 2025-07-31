import { Modal } from '@/components/modal/modal';
import doneImage from '@/images/done.png';
import styles from './order-details.module.css';
import { Preloader } from '@/components/preloader/preloader';

type TOrderDetailsProps = {
	isLoading: boolean;
	isSuccess: boolean;
	orderNumber?: number;
	onClose: () => void;
};

export const OrderDetails = ({
	isLoading,
	isSuccess,
	orderNumber,
	onClose,
}: TOrderDetailsProps): React.JSX.Element => {
	return (
		<Modal onClose={onClose}>
			<div className={`${styles.content} pt-4 pb-20`}>
				{isLoading ? (
					<>
						<Preloader />
						<p className='text text_type_main-medium mt-10'>
							Оформляем ваш заказ...
						</p>
					</>
				) : isSuccess ? (
					<>
						<p
							className={`${styles.number} text text_type_digits-large mb-8`}
							data-testid='order-number'>
							{orderNumber}
						</p>

						<p className='text text_type_main-medium mb-15'>
							идентификатор заказа
						</p>

						<img src={doneImage} alt='Заказ подтвержден' />

						<p
							className={`${styles.description} text text_type_main-default mt-15`}>
							Ваш заказ начали готовить
							<span className='text_color_inactive'>
								Дождитесь готовности на орбитальной станции
							</span>
						</p>
					</>
				) : (
					<p className='text text_type_main-medium mt-10'>
						Не удалось оформить заказ. Попробуйте еще раз.
					</p>
				)}
			</div>
		</Modal>
	);
};
