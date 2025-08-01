import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';

import { AppHeader } from '@components/app-header/app-header';
import { HomePage } from '@/pages/home/home';
import { LoginPage } from '@/pages/auth/login/login';
import { RegisterPage } from '@/pages/auth/register/register';
import { ForgotPasswordPage } from '@/pages/auth/forgot-password/forgot-password';
import { ResetPasswordPage } from '@/pages/auth/reset-password/reset-password';
import { ProfilePage } from '@/pages/profile/profile';
import { OrdersPage } from '@/pages/profile/orders/orders';
import { NotFoundPage } from '@/pages/not-found/not-found';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { ProfileEdit } from '../../pages/profile/profile-edit/profile-edit';
import { IngredientsDetails } from '../burger-ingredients/ingredients-details/ingredients-details';
import { Modal } from '../modal/modal';
import { Preloader } from '../preloader/preloader';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import { useLazyGetUserQuery } from '@/services/user/api';
import { setIsAuthChecked } from '@/services/user/reducer';
import { useDispatch } from '@/utils/types';
import { FeedPage } from '@/pages/feed/feed';
import { IngredientPage } from '@/pages/ingredient/ingredient';
import { OrderPage } from '@/pages/order/order';
import { OrderModal } from '../order-modal/order-modal';

export const App = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const [triggerGetUser] = useLazyGetUserQuery();

	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			triggerGetUser();
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}, [dispatch, triggerGetUser]);

	const { isLoading } = useGetIngredientsQuery();

	const location = useLocation();
	const navigate = useNavigate();

	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<>
			<AppHeader />

			<main className={styles.main}>
				{isLoading ? (
					<Preloader />
				) : (
					<>
						{background && (
							<Routes>
								<Route
									path='/ingredients/:id'
									element={
										<Modal
											title='Детали ингредиента'
											onClose={handleModalClose}>
											<IngredientsDetails />
										</Modal>
									}
								/>
								<Route
									path='/feed/:number'
									element={<OrderModal onClose={handleModalClose} />}
								/>
								<Route
									path='/profile/orders/:number'
									element={<OrderModal onClose={handleModalClose} />}
								/>
							</Routes>
						)}

						<Routes location={background || location}>
							<Route
								path='/login'
								element={<OnlyUnAuth component={<LoginPage />} />}
							/>
							<Route
								path='/register'
								element={<OnlyUnAuth component={<RegisterPage />} />}
							/>
							<Route path='/forgot-password' element={<ForgotPasswordPage />} />
							<Route
								path='/reset-password'
								element={<OnlyUnAuth component={<ResetPasswordPage />} />}
							/>

							<Route
								path='/profile'
								element={<OnlyAuth component={<ProfilePage />} />}>
								<Route index element={<ProfileEdit />} />
								<Route path='orders' element={<OrdersPage />} />
							</Route>

							<Route path='/' element={<HomePage />} />
							<Route path='/feed' element={<FeedPage />} />
							<Route path='/feed/:number' element={<OrderPage />} />
							<Route path='/ingredients/:id' element={<IngredientPage />} />
							<Route path='/profile/orders/:number' element={<OrderPage />} />

							<Route path='*' element={<NotFoundPage />} />
						</Routes>
					</>
				)}
			</main>
		</>
	);
};
