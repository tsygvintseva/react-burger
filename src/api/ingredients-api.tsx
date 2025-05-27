import { BASE_URL } from '@/utils/const';
import { TIngredient } from '@/utils/types';

export const ingredientsApiConfig = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

type ApiResponse<T> = {
	success: boolean;
	data: T;
};

const getResponse = (res: Response): Promise<ApiResponse<TIngredient[]>> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = (): Promise<TIngredient[]> => {
	return fetch(`${ingredientsApiConfig.baseUrl}/ingredients`, {
		headers: ingredientsApiConfig.headers,
	})
		.then(getResponse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		});
};
