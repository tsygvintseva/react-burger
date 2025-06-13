import { createApi } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/const';
import { baseQueryRefreshToken } from '@/utils/base-query';

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

type AuthResponse = {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
};

type LogoutResponse = {
	success: boolean;
	message: string;
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

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryRefreshToken({
		baseUrl: authApiConfig.baseUrl,
		contentType: authApiConfig.headers['Content-Type'],
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
		}),
		logout: builder.mutation<LogoutResponse, { token: string }>({
			query: (body) => ({
				url: '/logout',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'LOGOUT' }],
		}),
		getUser: builder.query<UserResponse, void>({
			query: () => '/user',
			providesTags: () => [{ type: 'Auth', id: 'GET_USER' }],
		}),
		updateUser: builder.mutation<UserResponse, UserRequest>({
			query: (body) => ({
				url: '/user',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [{ type: 'Auth', id: 'CHANGE_USER' }],
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useGetUserQuery,
	useUpdateUserMutation,
} = authApi;
