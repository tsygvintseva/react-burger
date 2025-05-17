import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';

import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '@components/preloader/preloader';

import { TIngredient } from '@/utils/types';
import { EIngredientType } from '@/utils/enums';

const GET_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export const App = (): React.JSX.Element => {
	const [state, setState] = useState({
		ingredients: [],
		loading: true,
	});

	const [orderList, setOrderList] = useState<TIngredient[]>([]);

	useEffect(() => {
		const getIngredients = async () => {
			setState((prev) => ({ ...prev, loading: true }));

			try {
				const res = await fetch(GET_INGREDIENTS);

				if (!res.ok) {
					throw new Error(`Ошибка при загрузке ингредиентов: ${res.status}`);
				}

				const { data } = await res.json();
				setState({ ingredients: data, loading: false });
			} catch (error) {
				console.error('Ошибка при загрузке ингредиентов:', error);
				setState((prev) => ({ ...prev, loading: false }));
			}
		};

		getIngredients();
	}, []);

	const selectIngredient = useCallback((ingredient: TIngredient) => {
		setOrderList((prev) => {
			if (ingredient.type === EIngredientType.Bun) {
				const isAlreadySelected = prev.some(
					(item) =>
						item.type === EIngredientType.Bun && item._id === ingredient._id
				);

				if (isAlreadySelected) {
					return [...prev];
				}

				const withoutBuns = prev.filter(
					(item) => item.type !== EIngredientType.Bun
				);

				return [ingredient, ...withoutBuns];
			}

			return [...prev, ingredient];
		});
	}, []);

	const unselectIngredient = useCallback((index: number) => {
		setOrderList((prev) => {
			const hasBun = prev.some((item) => item.type === EIngredientType.Bun);
			const adjustedIndex = hasBun ? index + 1 : index;

			return prev.filter((_, item) => item !== adjustedIndex);
		});
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				{state.loading ? (
					<Preloader />
				) : (
					<>
						<BurgerIngredients
							ingredients={state.ingredients}
							orderList={orderList}
							selectIngredient={selectIngredient}
						/>
						<BurgerConstructor
							ingredients={orderList}
							handleClose={unselectIngredient}
						/>
					</>
				)}
			</main>
		</div>
	);
};
