import { createApi } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/const';
import { baseQueryRefreshToken } from '@/utils/refresh-token';
import { setIsAuthChecked, setUser } from './reducer';

export const userApiConfig = {
	baseUrl: BASE_URL + '/auth',
	headers: {
		'Content-Type': 'application/json',
	},
};

type UserRequest = {
	email: string;
	password: string;
	name: string;
};

type UserResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
};

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQueryRefreshToken({
		baseUrl: userApiConfig.baseUrl,
		contentType: userApiConfig.headers['Content-Type'],
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		getUser: builder.query<UserResponse, void>({
			query: () => '/user',
			providesTags: () => [{ type: 'Auth', id: 'USER' }],

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					dispatch(setUser(data.user));
				} catch {
					dispatch(setUser(null));
				}

				dispatch(setIsAuthChecked(true));
			},
		}),
		editUser: builder.mutation<UserResponse, UserRequest>({
			query: (body) => ({
				url: '/user',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'USER' }],

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data.user));
				} catch {
					// intentionally left blank
				}
			},
		}),
	}),
});

export const { useGetUserQuery, useLazyGetUserQuery, useEditUserMutation } =
	userApi;
