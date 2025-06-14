import { ErrorResponse } from './types';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const FORGOT_PASSWORD = `${BURGER_API_URL}/password-reset`;
const RESET_PASSWORD = `${FORGOT_PASSWORD}/reset`;
const UPDATE_TOKEN = `${BURGER_API_URL}/auth/token`;

export async function requestForgotPassword(email: string) {
	const res = await fetch(FORGOT_PASSWORD, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	});

	const data = await checkResponse(res);

	if (!data.success) {
		throw new Error(
			`Не удалось отправить email: ${res.status} ${data.message}`
		);
	}

	return data;
}

export async function requestResetPassword(state: {
	password: string;
	token: string;
}) {
	const res = await fetch(RESET_PASSWORD, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...state }),
	});

	const data = await checkResponse(res);

	if (!data.success) {
		throw new Error(
			`Не удалось восстановить пароль: ${res.status} ${data.message}`
		);
	}

	return data;
}

export const refreshToken = async () => {
	const res = await fetch(UPDATE_TOKEN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});

	const refreshData = await checkResponse(res);

	if (!refreshData.success) {
		return Promise.reject(refreshData);
	}

	localStorage.setItem('refreshToken', refreshData.refreshToken);
	localStorage.setItem('accessToken', refreshData.accessToken);

	return refreshData;
};

const checkResponse = (res: Response) => {
	return res.ok
		? res.json()
		: res.json().then((err: ErrorResponse) => Promise.reject(err));
};
