import { ApiResponse, TWSOrder } from '@/utils/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const ORDERS_ALL_URL = 'wss://norma.nomoreparties.space/orders/all';
const ORDERS_USER_URL = 'wss://norma.nomoreparties.space/orders';

type TWSOrdersResponse = ApiResponse<{
	orders: TWSOrder[];
	total: number;
	totalToday: number;
}>;

export const ordersSocketApi = createApi({
	reducerPath: 'ordersSocketApi',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => ({
		getPublicOrders: builder.query<TWSOrdersResponse, void>({
			queryFn: () => ({
				data: { success: false, orders: [], total: 0, totalToday: 0 },
			}),
			async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
				try {
					const socket = new WebSocket(ORDERS_ALL_URL);

					socket.onmessage = (event) => {
						try {
							const data = JSON.parse(event.data) as TWSOrdersResponse;
							if (data.success) {
								updateCachedData(() => data);
							}
						} catch (err) {
							console.error('WS message parse error', err);
						}
					};

					await cacheEntryRemoved;
					socket.close();
				} catch (err) {
					console.error('WebSocket setup error', err);
				}
			},
		}),

		getUserOrders: builder.query<TWSOrdersResponse, string>({
			query: () => 'user-orders',
			async onCacheEntryAdded(token, { updateCachedData, cacheEntryRemoved }) {
				try {
					const socket = new WebSocket(`${ORDERS_USER_URL}?token=${token}`);

					socket.onmessage = (event) => {
						try {
							const data = JSON.parse(event.data) as TWSOrdersResponse;
							if (data.success) {
								updateCachedData(() => data);
							}
						} catch (err) {
							console.error('WS message parse error', err);
						}
					};

					await cacheEntryRemoved;
					socket.close();
				} catch (err) {
					console.error('WebSocket setup error', err);
				}
			},
		}),
	}),
});

export const { useGetPublicOrdersQuery, useGetUserOrdersQuery } =
	ordersSocketApi;
