import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredients/api';
import { currentIngredientSlice } from './current-ingredient/reducer';
import { constructorDataSlice } from './constructor-data/reducer';
import { ordersApi } from './orders/api';
import { authApi } from './auth/api';

const rootReducer = combineSlices(
	ingredientsApi,
	currentIngredientSlice,
	constructorDataSlice,
	ordersApi,
	authApi
);

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				ingredientsApi.middleware,
				ordersApi.middleware,
				authApi.middleware
			),
	});
};
