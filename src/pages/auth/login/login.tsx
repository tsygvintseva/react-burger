import { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';
import { useLoginMutation } from '@/services/auth/api';
import { useForm } from '@/hooks/use-form';

export const LoginPage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();

	const { values, handleChange } = useForm({ email: '', password: '' });

	const [login] = useLoginMutation();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ ...values })
			.unwrap()
			.then(() => {
				const from = location.state?.from?.pathname || '/';

				goTo(from);
			})
			.catch((error) => {
				console.error('Не удалось войти:', error);
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
					value={values.email}
					name={'email'}
					placeholder='E-mail'
					isIcon={false}
					onChange={handleChange}
				/>
				<PasswordInput
					required
					value={values.password}
					name={'password'}
					placeholder='Пароль'
					extraClass='mb-2'
					onChange={handleChange}
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
