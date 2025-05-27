import { BASE_URL } from '@/utils/const';
import { TOrder } from '@/utils/types';

export const ordersApiConfig = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

type ApiResponse = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

const getResponse = (res: Response): Promise<ApiResponse> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const createOrder = (): Promise<TOrder> => {
	return fetch(`${ordersApiConfig.baseUrl}/orders`, {
		headers: ordersApiConfig.headers,
	})
		.then(getResponse)
		.then((data) => {
			if (data?.success)
				return {
					name: data.name,
					order: data.order,
				};

			return Promise.reject(data);
		});
};
