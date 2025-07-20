import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredients/api';
import { constructorDataSlice } from './constructor-data/reducer';
import { ordersApi } from './orders/api';
import { authApi } from './auth/api';
import { userApi } from './user/api';
import { userSlice } from './user/reducer';
import { ordersSocketApi } from './orders-soket/api';
import { ingredientsSlice } from './ingredients/reducer';
import { wsStatusSlice } from './orders-soket/reducer';

export const rootReducer = combineSlices(
	userSlice,
	ingredientsSlice,
	constructorDataSlice,
	wsStatusSlice,
	authApi,
	userApi,
	ordersApi,
	ingredientsApi,
	ordersSocketApi
);

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				authApi.middleware,
				userApi.middleware,
				ordersApi.middleware,
				ingredientsApi.middleware,
				ordersSocketApi.middleware
			),
	});
};
