import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/const';
import { setUser } from '../user/reducer';
import { ApiResponse } from '@/utils/types';

export const authApiConfig = {
	baseUrl: BASE_URL + '/auth',
	headers: {
		'Content-Type': 'application/json',
	},
};

type LoginRequest = Pick<RegisterRequest, 'email' | 'password'>;

type RegisterRequest = {
	email: string;
	password: string;
	name: string;
};

type AuthResponse = ApiResponse<{
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}>;

type LogoutResponse = ApiResponse<{
	message: string;
}>;

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: authApiConfig.baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', authApiConfig.headers['Content-Type']);
			return headers;
		},
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		register: builder.mutation<AuthResponse, RegisterRequest>({
			query: (body) => ({
				url: '/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'REGISTER' }],
		}),
		login: builder.mutation<AuthResponse, LoginRequest>({
			query: (body) => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'LOGIN' }],

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data.user));

					localStorage.setItem('accessToken', data.accessToken);
					localStorage.setItem('refreshToken', data.refreshToken);
				} catch {
					// intentionally left blank
				}
			},
		}),
		logout: builder.mutation<LogoutResponse, { token: string }>({
			query: (body) => ({
				url: '/logout',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'LOGOUT' }],

			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setUser(null));

					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
				} catch {
					// intentionally left blank
				}
			},
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
	authApi;
