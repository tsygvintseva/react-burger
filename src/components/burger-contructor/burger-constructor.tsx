import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
	getConstructorData,
	removeIngredient,
} from '@/services/constructor-data/reducer';
import { useModalVisible } from '@/hooks/use-modal-visible';
import styles from './burger-constructor.module.css';
import { ConstructorList } from './constructor-list/constructor-list';
import { OrderDetails } from './order-details/order-details';
import { useCreateOrderMutation } from '@/services/orders/api';
import { TOrder } from '@/utils/types';

export const BurgerConstructor = (): React.JSX.Element => {
	const [orderData, setOrderData] = useState<TOrder['order'] | null>(null);

	const [isOpen, open, close] = useModalVisible();

	const [createOrder] = useCreateOrderMutation();

	const dispatch = useDispatch();

	const handleUnSelectIngredient = (key: string) => {
		dispatch(removeIngredient(key));
	};

	const constructorData = useSelector(getConstructorData);

	const totalPrice = useMemo(() => {
		return constructorData.reduce((sum, item) => sum + item.price, 0);
	}, [constructorData]);

	const handleClick = () => {
		const ids = constructorData.map((item) => item._id);
		createOrder({ ingredients: ids })
			.unwrap()
			.then(({ order }) => {
				setOrderData(order);
				open();
			});
	};

	return (
		<>
			<section>
				{constructorData.length ? (
					<>
						<div className={`${styles.constructor} ml-4 mr-4 mb-10`}>
							{/* {bun && (
								<ConstructorElement
									type='top'
									isLocked={true}
									text={`${bun.name} (верх)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)} */}

							{
								<ConstructorList
									ingredients={constructorData}
									onClose={handleUnSelectIngredient}
								/>
							}

							{/* {bun && (
								<ConstructorElement
									type='bottom'
									isLocked={true}
									text={`${bun.name} (низ)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)} */}
						</div>

						{constructorData.length && (
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
						)}
					</>
				) : (
					<p className='text text_type_main-default'>
						🚀 Ваш бургер ещё не собран. Добавьте булку, соусы и начинки.
					</p>
				)}
			</section>

			{isOpen && (
				<OrderDetails orderNumber={orderData?.number} onClose={close} />
			)}
		</>
	);
};
