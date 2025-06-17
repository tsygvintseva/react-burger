import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register.module.css';
import { useRegisterMutation } from '@/services/auth/api';
import { useForm } from '@/hooks/use-form';

export const RegisterPage = (): React.JSX.Element => {
	const navigate = useNavigate();

	const { values, handleChange } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [register] = useRegisterMutation();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		register({ ...values })
			.unwrap()
			.then(() => {
				goTo('/login');
			})
			.catch((error) => {
				console.error('Не удалось зарегистрироваться:', error);
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
					value={values.name}
					type={'text'}
					name={'name'}
					placeholder='Имя'
					onChange={handleChange}
				/>

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
					onChange={handleChange}
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
