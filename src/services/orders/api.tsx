import { BASE_URL } from '@/utils/const';
import { TOrder } from '@/utils/types';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

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
	baseQuery: fetchBaseQuery({
		baseUrl: ordersApiConfig.baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', ordersApiConfig.headers['Content-Type']);
			return headers;
		},
	}),
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		createOrder: builder.mutation<TOrder, CreateOrderPayload>({
			query: (body) => ({
				url: '/orders',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Orders', id: 'ORDERS' }],
		}),
	}),
});

export const { useCreateOrderMutation } = ordersApi;
