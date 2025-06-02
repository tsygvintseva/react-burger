import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { ingredientsApi } from './ingredients/api';
import { currentIngredientSlice } from './current-ingredient/reducer';
import { constructorDataSlice } from './constructor-data/reducer';
import { ordersApi } from './orders/api';

const rootReducer = combineSlices(
	ingredientsApi,
	currentIngredientSlice,
	constructorDataSlice,
	ordersApi
);

export const configureStore = () => {
	return createStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(
				ingredientsApi.middleware,
				ordersApi.middleware
			),
	});
};
