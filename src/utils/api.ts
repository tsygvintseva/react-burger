import { BASE_URL } from './const';
import { ApiResponse } from './types';

export const requestForgotPassword = (email: string) =>
	request('password-reset', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email }),
	});

export const requestResetPassword = (params: {
	password: string;
	token: string;
}) =>
	request('reset', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...params }),
	});

export const refreshToken = () =>
	request('auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then((data) => {
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);

		return data;
	});

const request = async (endpoint: string, options?: RequestInit) => {
	const res = await fetch(`${BASE_URL}/${endpoint}`, options);
	const res_1 = await checkResponse(res);

	return checkSuccess(res_1);
};

const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const checkSuccess = <T>(
	res: ApiResponse<T>
): Promise<ApiResponse<T>> => {
	if (res && res.success) {
		return Promise.resolve(res);
	}

	return Promise.reject(`Ответ не success: ${JSON.stringify(res)}`);
};
