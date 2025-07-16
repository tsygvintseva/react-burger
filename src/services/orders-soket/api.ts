import { ApiResponse, TWSOrder } from '@/utils/types';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { setWSStatus } from './reducer';
import { EWSConnectionStatus } from '@/utils/enums';

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
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved, dispatch }
			) {
				dispatch(setWSStatus(EWSConnectionStatus.Connecting));

				try {
					const socket = new WebSocket(ORDERS_ALL_URL);

					socket.onopen = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Open));
					};

					socket.onmessage = (event) => {
						dispatch(setWSStatus(EWSConnectionStatus.Receiving));

						try {
							const data = JSON.parse(event.data) as TWSOrdersResponse;
							if (data.success) {
								updateCachedData(() => data);
							}
						} catch (err) {
							console.error('WS message parse error', err);
							dispatch(setWSStatus(EWSConnectionStatus.Error));
						}
					};

					socket.onerror = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Error));
					};

					socket.onclose = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Closed));
					};

					await cacheEntryRemoved;
					socket.close();
				} catch (err) {
					console.error('WS setup error', err);
				}
			},
		}),

		getUserOrders: builder.query<TWSOrdersResponse, void>({
			queryFn: () => ({
				data: { success: false, orders: [], total: 0, totalToday: 0 },
			}),
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved, dispatch }
			) {
				const bearerToken = localStorage.getItem('accessToken');
				if (!bearerToken) return;

				const token = bearerToken.replace(/^Bearer\s/, '');

				dispatch(setWSStatus(EWSConnectionStatus.Connecting));

				try {
					const socket = new WebSocket(`${ORDERS_USER_URL}?token=${token}`);

					socket.onopen = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Open));
					};

					socket.onmessage = (event) => {
						dispatch(setWSStatus(EWSConnectionStatus.Receiving));

						try {
							const data = JSON.parse(event.data) as TWSOrdersResponse;
							if (data.success) {
								updateCachedData(() => data);
							}
						} catch (err) {
							console.error('WS message parse error', err);
							dispatch(setWSStatus(EWSConnectionStatus.Error));
						}
					};

					socket.onerror = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Error));
					};

					socket.onclose = () => {
						dispatch(setWSStatus(EWSConnectionStatus.Closed));
					};

					await cacheEntryRemoved;
					socket.close();
				} catch (err) {
					console.error('WS setup error', err);
				}
			},
		}),
	}),
});

export const { useGetPublicOrdersQuery, useGetUserOrdersQuery } =
	ordersSocketApi;
