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

const getResponse = async (res: Response): Promise<TIngredient[]> => {
	if (!res.ok)
		throw new Error(`Ошибка при загрузке ингредиентов: ${res.status}`);

	const json: ApiResponse<TIngredient[]> = await res.json();

	if (!json.success) throw new Error('Ошибка сервера');

	return json.data;
};

export const getIngredients = (): Promise<TIngredient[]> => {
	return fetch(`${ingredientsApiConfig.baseUrl}/ingrediens`, {
		headers: ingredientsApiConfig.headers,
	}).then(getResponse);
};
