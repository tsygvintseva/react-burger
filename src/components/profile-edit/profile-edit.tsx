import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-edit.module.css';
import { useGetUserQuery, useUpdateUserMutation } from '@/services/auth/api';

export const ProfileEdit = (): React.JSX.Element => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [isValueChanged, setValueChanged] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const { data } = useGetUserQuery();
	const [updateUser] = useUpdateUserMutation();

	useEffect(() => {
		if (!data) return;

		const { success, user } = data;

		if (success) {
			setState((prev) => ({
				...prev,
				...user,
			}));
		}
	}, [data]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const { name, value } = target;

		setState({
			...state,
			[name]: value,
		});

		setValueChanged(true);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		updateUser({ ...state })
			.unwrap()
			.then(() => {})
			.catch((error) => {
				console.error('Не удалось обновить данные о пользователе', error);
			});
		setValueChanged(false);
	};

	return (
		<form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
			<Input
				required
				value={state.name}
				type={'text'}
				name={'name'}
				placeholder='Имя'
				icon='EditIcon'
				onChange={onChange}
			/>

			<EmailInput
				required
				value={state.email}
				name={'email'}
				placeholder='Логин'
				isIcon={true}
				onChange={onChange}
			/>
			<PasswordInput
				required
				value={state.password}
				name={'password'}
				placeholder='Пароль'
				icon='EditIcon'
				onChange={onChange}
			/>

			{isValueChanged && (
				<div className={styles.footer}>
					<Button htmlType='button' type='secondary' size='medium'>
						Отмена
					</Button>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
