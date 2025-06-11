import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';
import { useRegisterMutation } from '@/services/auth/api';
import { useLocalStorage } from '@/hooks/use-local-storage';

export const RegisterPage = (): React.JSX.Element => {
	const [, setAccessToken] = useLocalStorage<string>('accessToken', '');
	const [, setRefreshTokens] = useLocalStorage<string>('refreshToken', '');

	const navigate = useNavigate();
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [register] = useRegisterMutation();

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

		register({ ...state })
			.unwrap()
			.then(({ accessToken, refreshToken }) => {
				setAccessToken(accessToken);
				setRefreshTokens(refreshToken);

				goTo('/');
			})
			.catch((error) => {
				console.error('Ошибка при регистрации', error);
			});
	};

	const goTo = (url: string) => {
		navigate(url, { replace: true });
	};

	return (
		<div className={styles.wrapper}>
			<h1 className='text text_type_main-medium'>Регистрация</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					required
					value={state.name}
					type={'text'}
					name={'name'}
					placeholder='Имя'
					onChange={onChange}
				/>

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
					onChange={onChange}
				/>

				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
			</form>

			<div className={styles.footer}>
				<p className='text text_type_main-default'>
					<span className='text_color_inactive'>Уже зарегистрированы?</span>

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
