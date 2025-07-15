import { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';
import { requestResetPassword } from '@/utils/api';
import { useForm } from '@/hooks/use-form';

export const ResetPasswordPage = (): React.JSX.Element => {
	const navigate = useNavigate();

	const location = useLocation();
	const fromForgot = location.state?.fromForgot;

	const { values, handleChange } = useForm({
		password: '',
		token: '',
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const resetPassword = async () => {
			try {
				await requestResetPassword(values);

				goTo('/login');
			} catch (error) {
				console.error('Не удалось восстановить пароль:', error);
			}
		};

		resetPassword();
	};

	const goTo = (url: string) => {
		navigate(url, { replace: true });
	};

	if (!fromForgot) {
		return <Navigate to='/forgot-password' replace />;
	}

	return (
		<section className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<PasswordInput
					required
					value={values.password}
					name={'password'}
					placeholder='Введите новый пароль'
					extraClass='mb-2'
					onChange={handleChange}
				/>
				<Input
					required
					type={'text'}
					name={'token'}
					placeholder='Введите код из письма'
					onChange={handleChange}
					value={values.token}
					error={false}
				/>

				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
				</Button>
			</form>

			<div className={styles.footer}>
				<p className='text text_type_main-default'>
					<span className='text_color_inactive'>Вспомнили пароль?</span>

					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass={styles.button}
						onClick={() => goTo('/login')}>
						Войти
					</Button>
				</p>
			</div>
		</section>
	);
};
