import { ChangeEvent, FormEvent, useState } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';
import { requestForgotPassword } from '@/utils/api';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const forgotPassword = async () => {
			try {
				await requestForgotPassword(email);

				goTo('/reset-password', { fromForgot: true });
			} catch (error) {
				console.error('Не удалось отправить email:', error);
			}
		};

		forgotPassword();
	};

	const goTo = (url: string, state?: NavigateOptions['state']) => {
		const options = {
			state,
			replace: true,
		};

		navigate(url, { ...options });
	};

	return (
		<section className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<EmailInput
					required
					value={email}
					name={'email'}
					placeholder='Укажите e-mail'
					isIcon={false}
					onChange={onChange}
				/>

				<Button htmlType='submit' type='primary' size='medium'>
					Восстановить
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
