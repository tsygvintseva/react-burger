import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { EIngredientType } from '@/utils/enums';
import { TIngredient } from '@utils/types.ts';
import styles from './burger-constructor.module.css';
import { ConstructorDragList } from './constructor-drag-list/constructor-drag-list';
import { useState } from 'react';
import { OrderDetails } from './order-details/order-details';

export type TBurgerConstructorProps = {
	ingredients: TIngredient[];
	handleClose: (index: number) => void;
};

export const BurgerConstructor = ({
	ingredients,
	handleClose,
}: TBurgerConstructorProps): React.JSX.Element => {
	const [visibleDetails, toggleVisibleDetails] = useState(false);

	const handleOpenModal = () => {
		toggleVisibleDetails(true);
	};

	const handleCloseModal = () => {
		toggleVisibleDetails(false);
	};

	const bun = ingredients.find((item) => item.type === EIngredientType.Bun);
	const middle = ingredients.filter(
		(item) => item.type !== EIngredientType.Bun
	);

	const totalPrice = ingredients.reduce((sum, item) => {
		const bunBonus = item.type === EIngredientType.Bun ? item.price : 0;

		return sum + item.price + bunBonus;
	}, 0);

	return (
		<>
			<section>
				{ingredients.length ? (
					<>
						<div className={`${styles.constructor} ml-4 mr-4 mb-10`}>
							{bun && (
								<ConstructorElement
									type='top'
									isLocked={true}
									text={`${bun.name} (верх)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)}

							<ConstructorDragList
								ingredients={middle}
								handleClose={handleClose}
							/>

							{bun && (
								<ConstructorElement
									type='bottom'
									isLocked={true}
									text={`${bun.name} (низ)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)}
						</div>

						{bun && !!middle.length && (
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
									onClick={handleOpenModal}>
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

			{visibleDetails && <OrderDetails onClose={handleCloseModal} />}
		</>
	);
};
