import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password.module.css';
import { requestResetPassword } from '@/utils/api';

export const ResetPasswordPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const [state, setState] = useState({
		password: '',
		token: '',
	});

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const { name, value } = target;

		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const resetPassword = async () => {
			try {
				await requestResetPassword(state);

				localStorage.removeItem('resetPassword');
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

	return (
		<div className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<PasswordInput
					required
					value={state.password}
					name={'password'}
					placeholder='Введите новый пароль'
					extraClass='mb-2'
					onChange={onChange}
				/>
				<Input
					required
					type={'text'}
					name={'token'}
					placeholder='Введите код из письма'
					onChange={onChange}
					value={state.token}
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
		</div>
	);
};
