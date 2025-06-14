import { createApi } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/const';
import { TOrder } from '@/utils/types';
import { baseQueryRefreshToken } from '@/utils/refresh-token';

export const ordersApiConfig = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

type CreateOrderPayload = {
	ingredients: string[];
};

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: baseQueryRefreshToken({
		baseUrl: ordersApiConfig.baseUrl,
		contentType: ordersApiConfig.headers['Content-Type'],
	}),
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		createOrder: builder.mutation<TOrder, CreateOrderPayload>({
			query: (body: CreateOrderPayload) => ({
				url: '/orders',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Orders', id: 'ORDERS' }],
		}),
	}),
});

export const { useCreateOrderMutation } = ordersApi;
