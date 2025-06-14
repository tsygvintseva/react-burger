import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-edit.module.css';
import { useEditUserMutation } from '@/services/user/api';
import { useSelector } from 'react-redux';
import { getUser } from '@/services/user/reducer';

export const ProfileEdit = (): React.JSX.Element => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [isValueChanged, setValueChanged] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const user = useSelector(getUser);
	const [editUser] = useEditUserMutation();

	useEffect(() => {
		setState((prev) => ({
			...prev,
			...user,
		}));

		setValueChanged(false);
	}, [user]);

	useEffect(() => {
		if (!user) return;

		const changed =
			user.name !== state.name ||
			user.email !== state.email ||
			!!state.password;

		setValueChanged(changed);
	}, [state, user]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		const { name, value } = target;

		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		editUser({ ...state }).catch((error) => {
			console.error('Не удалось обновить данные о пользователе', error);
		});
	};

	const handleReset = () => {
		if (!user) return;

		setState({
			...user,
			password: '',
		});
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
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={handleReset}>
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
