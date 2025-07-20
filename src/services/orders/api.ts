import { createApi } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/const';
import { ApiResponse, TOrder, TWSOrder } from '@/utils/types';
import { baseQueryRefreshToken } from '@/utils/refresh-token';

export const ordersApiConfig = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

type CreateOrderRequest = {
	ingredients: string[];
};

type OrderResponse = ApiResponse<{
	orders: TWSOrder[];
}>;

export const ordersApi = createApi({
	reducerPath: 'ordersApi',
	baseQuery: baseQueryRefreshToken({
		baseUrl: ordersApiConfig.baseUrl,
		contentType: ordersApiConfig.headers['Content-Type'],
	}),
	tagTypes: ['Orders'],
	endpoints: (builder) => ({
		createOrder: builder.mutation<TOrder, CreateOrderRequest>({
			query: (body: CreateOrderRequest) => ({
				url: '/orders',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Orders', id: 'ORDERS' }],
		}),
		getOrderByNumber: builder.query<OrderResponse, string>({
			query: (number) => `/orders/${number}`,
			providesTags: () => [{ type: 'Orders', id: 'ITEM' }],
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderByNumberQuery,
	useLazyGetOrderByNumberQuery,
} = ordersApi;
