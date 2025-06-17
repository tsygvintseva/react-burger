import { FormEvent, useEffect, useRef, useState } from 'react';
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
import { useForm } from '@/hooks/use-form';

export const ProfileEdit = (): React.JSX.Element => {
	const { values, handleChange, setValues } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [isValueChanged, setValueChanged] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const user = useSelector(getUser);
	const [editUser] = useEditUserMutation();

	useEffect(() => {
		if (user) setValues({ ...user, password: '' });

		setValueChanged(false);
	}, [user]);

	useEffect(() => {
		if (!user) return;

		const changed =
			user.name !== values.name ||
			user.email !== values.email ||
			!!values.password;

		setValueChanged(changed);
	}, [values, user]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		editUser({ ...values }).catch((error) => {
			console.error('Не удалось обновить данные о пользователе', error);
		});
	};

	const handleReset = () => {
		if (!user) return;

		setValues({ ...user, password: '' });
	};

	return (
		<form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
			<Input
				required
				value={values.name}
				type={'text'}
				name={'name'}
				placeholder='Имя'
				icon='EditIcon'
				onChange={handleChange}
			/>
			<EmailInput
				required
				value={values.email}
				name={'email'}
				placeholder='Логин'
				isIcon={true}
				onChange={handleChange}
			/>
			<PasswordInput
				required
				value={values.password}
				name={'password'}
				placeholder='Пароль'
				icon='EditIcon'
				onChange={handleChange}
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
