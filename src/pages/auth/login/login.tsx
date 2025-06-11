import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';
import { useLoginMutation } from '@/services/auth/api';
import { useLocalStorage } from '@/hooks/use-local-storage';

export const LoginPage = (): React.JSX.Element => {
	const [, setAccessToken] = useLocalStorage<string>('accessToken', '');
	const [, setRefreshTokens] = useLocalStorage<string>('refreshToken', '');

	const navigate = useNavigate();
	const [state, setState] = useState({
		email: '',
		password: '',
	});

	const [login] = useLoginMutation();

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

		login({ ...state })
			.unwrap()
			.then(({ accessToken, refreshToken }) => {
				setAccessToken(accessToken);
				setRefreshTokens(refreshToken);

				goTo('/');
			})
			.catch((error) => {
				console.error('Ошибка при входе', error);
			});
	};

	const goTo = (url: string) => {
		navigate(url, { replace: true });
	};

	return (
		<div className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>Вход</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<EmailInput
					required
					value={state.email}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
					onChange={onChange}
				/>
				<PasswordInput
					required
					value={state.password}
					name={'password'}
					placeholder='Пароль'
					extraClass='mb-2'
					onChange={onChange}
				/>

				<Button htmlType='submit' type='primary' size='medium'>
					Войти
				</Button>
			</form>

			<div className={styles.footer}>
				<p className='text text_type_main-default'>
					<span className='text_color_inactive'>Вы — новый пользователь?</span>

					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass={styles.button}
						onClick={() => goTo('/register')}>
						Зарегистрироваться
					</Button>
				</p>
				<p className='text text_type_main-default'>
					<span className='text_color_inactive'>Забыли пароль?</span>

					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						extraClass={styles.button}
						onClick={() => goTo('/forgot-password')}>
						Восстановить пароль
					</Button>
				</p>
			</div>
		</div>
	);
};
