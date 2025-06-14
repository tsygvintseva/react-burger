import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { refreshToken } from './api';
import { ErrorResponse } from './types';
import { authApi } from '@/services/auth/api';

interface CreateBaseQueryOptions {
	baseUrl: string;
	contentType?: string;
}

export const baseQueryRefreshToken = ({
	baseUrl,
	contentType = 'application/json',
}: CreateBaseQueryOptions): BaseQueryFn => {
	return async (args, api, extraOptions) => {
		const baseQuery = fetchBaseQuery({
			baseUrl,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', contentType);

				const token = localStorage.getItem('accessToken');
				if (token) headers.set('Authorization', `${token}`);

				return headers;
			},
		});

		let result = await baseQuery(args, api, extraOptions);

		const isJwtExpired =
			result.error &&
			(result.error.data as ErrorResponse).message === 'jwt expired';

		if (isJwtExpired) {
			try {
				const refreshData = await refreshToken();
				localStorage.setItem('accessToken', refreshData.accessToken);

				result = await baseQuery(args, api, extraOptions);
			} catch (err) {
				const refreshToken = localStorage.getItem('refreshToken');

				if (refreshToken) {
					await api.dispatch(
						authApi.endpoints.logout.initiate({ token: refreshToken })
					);

					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
				}
			}
		}

		return result;
	};
};
