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

const RECONNECT_DELAY = 3000;

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
				let socket: WebSocket | null = null;
				let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
				let manuallyClosed = false;

				const connectSocket = () => {
					dispatch(setWSStatus(EWSConnectionStatus.Connecting));

					try {
						socket = new WebSocket(ORDERS_ALL_URL);

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
							} catch (error) {
								console.error('Ошибка при обработке данных от сервера', error);
								dispatch(setWSStatus(EWSConnectionStatus.Error));
								return;
							}
						};

						socket.onerror = () => {
							dispatch(setWSStatus(EWSConnectionStatus.Error));
						};

						socket.onclose = (event) => {
							dispatch(setWSStatus(EWSConnectionStatus.Closed));

							const wasClean = event.wasClean || event.code === 1000;
							const isConnected = !manuallyClosed;

							if (isConnected && !wasClean) {
								reconnectTimer = setTimeout(() => {
									connectSocket();
								}, RECONNECT_DELAY);
							}
						};
					} catch (error) {
						console.error('Ошибка подключения к WS', error);
						return;
					}
				};

				connectSocket();

				await cacheEntryRemoved;

				manuallyClosed = true;
				if (socket) (socket as WebSocket).close();
				if (reconnectTimer) clearTimeout(reconnectTimer);
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

				const socket: WebSocket | null = null;
				let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
				let manuallyClosed = false;

				const connectSocket = () => {
					dispatch(setWSStatus(EWSConnectionStatus.Connecting));

					try {
						const token = bearerToken.replace(/^Bearer\s/, '');
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
							} catch (error) {
								console.error('Ошибка при обработке данных от сервера', error);
								dispatch(setWSStatus(EWSConnectionStatus.Error));

								return;
							}
						};

						socket.onerror = () => {
							dispatch(setWSStatus(EWSConnectionStatus.Error));
						};

						socket.onclose = (event) => {
							dispatch(setWSStatus(EWSConnectionStatus.Closed));

							const wasClean = event.wasClean || event.code === 1000;
							const isConnected = !manuallyClosed;

							if (isConnected && !wasClean) {
								reconnectTimer = setTimeout(() => {
									connectSocket();
								}, RECONNECT_DELAY);
							}
						};
					} catch (error) {
						console.error('Ошибка подключения к WS', error);
						return;
					}
				};

				connectSocket();

				await cacheEntryRemoved;

				manuallyClosed = true;
				if (socket) (socket as WebSocket).close();
				if (reconnectTimer) clearTimeout(reconnectTimer);
			},
		}),
	}),
});

export const { useGetPublicOrdersQuery, useGetUserOrdersQuery } =
	ordersSocketApi;
