import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { HomePage } from '@/pages/home/home';
import { LoginPage } from '@/pages/auth/login/login';
import { RegisterPage } from '@/pages/auth/register/register';
import { ForgotPasswordPage } from '@/pages/auth/forgot-password/forgot-password';
import { ResetPasswordPage } from '@/pages/auth/reset-password/reset-password';
import { ProfilePage } from '@/pages/profile/profile';
import { OrdersPage } from '@/pages/profile/orders/orders';
import { ProfileEdit } from '../profile-edit/profile-edit';

export const App = (): React.JSX.Element => {
	return (
		<>
			<AppHeader />

			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />

				<Route path='/profile' element={<ProfilePage />}>
					<Route index element={<ProfileEdit />} />
					<Route path='orders' element={<OrdersPage />} />
				</Route>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</>
	);
};
