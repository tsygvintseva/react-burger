import { ChangeEvent, FormEvent, useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-edit.module.css';

export const ProfileEdit = (): React.JSX.Element => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
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
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				value={state.name}
				type={'text'}
				name={'name'}
				placeholder='Имя'
				icon='EditIcon'
				onChange={onChange}
			/>

			<EmailInput
				value={state.email}
				name={'email'}
				placeholder='Логин'
				isIcon={true}
				onChange={onChange}
			/>
			<PasswordInput
				value={state.password}
				name={'password'}
				placeholder='Пароль'
				icon='EditIcon'
				onChange={onChange}
			/>

			<div className={styles.footer}>
				<Button htmlType='button' type='secondary' size='medium'>
					Отмена
				</Button>
				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
				</Button>
			</div>
		</form>
	);
};
