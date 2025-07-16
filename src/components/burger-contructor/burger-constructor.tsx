import { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useModalVisible } from '@/hooks/use-modal-visible';
import {
	addIngredient,
	clearConstructorData,
	getConstructorData,
	removeIngredient,
} from '@/services/constructor-data/reducer';
import { useCreateOrderMutation } from '@/services/orders/api';
import { TIngredient, TOrder, useDispatch, useSelector } from '@/utils/types';
import styles from './burger-constructor.module.css';
import { ConstructorList } from './constructor-list/constructor-list';
import { OrderDetails } from './order-details/order-details';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): React.JSX.Element => {
	const [orderData, setOrderData] = useState<TOrder['order'] | null>(null);

	const [isOpen, open, close] = useModalVisible();

	const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const constructorData = useSelector(getConstructorData);

	const totalPrice = useMemo(() => {
		return constructorData.reduce((sum, item) => sum + item.price, 0);
	}, [constructorData]);

	const [{ isHover }, dropTarget] = useDrop<
		TIngredient,
		unknown,
		{ isHover: boolean }
	>({
		accept: 'ingredients',
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(item: TIngredient) {
			dispatch(addIngredient(item));
		},
	});

	const handleUnSelectIngredient = (key: string) => {
		dispatch(removeIngredient(key));
	};

	const handleClick = () => {
		const token = localStorage.getItem('accessToken');

		if (!token) navigate('/login', { replace: true });
		else {
			open();

			const ids = constructorData.map((item) => item._id);
			createOrder({ ingredients: ids })
				.unwrap()
				.then(({ order }) => {
					setOrderData(order);

					dispatch(clearConstructorData());
				})
				.catch((error) => {
					console.error('Не удалось оформить заказ:', error);
				});
		}
	};

	return (
		<>
			<section>
				{constructorData.length ? (
					<>
						<div
							ref={dropTarget}
							className={` ${styles.constructor} ${isHover ? styles.bounce : ''} mb-10`}>
							{
								<ConstructorList
									ingredients={constructorData}
									onClose={handleUnSelectIngredient}
								/>
							}
						</div>

						<div className={`${styles.footer} mr-4`}>
							<p className='text text_type_digits-medium'>
								<span className='mr-2'>{totalPrice}</span>
								<CurrencyIcon
									type='primary'
									className=' text_type_digits-large'
								/>
							</p>

							<Button
								htmlType='button'
								type='primary'
								size='large'
								onClick={handleClick}>
								Оформить заказ
							</Button>
						</div>
					</>
				) : (
					<div
						ref={dropTarget}
						className={`${styles.empty} ${isHover ? styles.bounce : ''}`}>
						<p
							className={`${isHover ? styles.bounce : ''} text text_type_main-default text_color_inactive`}>
							🚀 Ваш бургер ещё не собран.
							<br /> Перетащите булку, соусы и начинки.
						</p>
					</div>
				)}
			</section>

			{isOpen && (
				<OrderDetails
					isLoading={isLoading}
					isSuccess={isSuccess}
					orderNumber={orderData?.number}
					onClose={close}
				/>
			)}
		</>
	);
};
