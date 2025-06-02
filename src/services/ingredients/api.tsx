import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { TIngredient } from '@/utils/types';
import { BASE_URL } from '@/utils/const';

export const ingredientsApiConfig = {
	baseUrl: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
};

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: ingredientsApiConfig.baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', ingredientsApiConfig.headers['Content-Type']);
			return headers;
		},
	}),
	tagTypes: ['Ingredients'],
	endpoints: (builder) => ({
		getIngredients: builder.query<TIngredient[], void>({
			query: () => '/ingredients',
			transformResponse: (response: {
				success: boolean;
				data: TIngredient[];
			}) => response.data,
			providesTags: () => [{ type: 'Ingredients', id: 'LIST' }],
		}),
	}),
});

export const { useGetIngredientsQuery } = ingredientsApi;
