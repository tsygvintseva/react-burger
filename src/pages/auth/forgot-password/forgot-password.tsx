import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';

const FORGOT_PASSWORD = 'https://norma.nomoreparties.space/api/password-reset';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const resetPassword = async () => {
			try {
				const res = await fetch(FORGOT_PASSWORD, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
					}),
				});

				const data = await res.json();

				if (data.success) goTo('/reset-password');
				else {
					throw new Error(
						`Ошибка восстановления пароля: ${res.status} ${data.message}`
					);
				}
			} catch (error) {
				console.error('Ошибка восстановления пароля:', error);
			}
		};

		resetPassword();
	};

	const goTo = (url: string) => {
		navigate(url, { replace: true });
	};

	return (
		<div className={styles.wrapper}>
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
		</div>
	);
};
