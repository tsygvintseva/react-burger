import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { authApi } from '@/services/auth/api';
import { refreshToken } from './api';
import { ErrorResponse } from './types';

interface CreateBaseQueryOptions {
	baseUrl: string;
	contentType?: string;
}

export const baseQueryRefreshToken = ({
	baseUrl,
	contentType = 'application/json',
}: CreateBaseQueryOptions): BaseQueryFn => {
	return async (args, api, options) => {
		const baseQuery = fetchBaseQuery({
			baseUrl,
			prepareHeaders: (headers) => {
				headers.set('Content-Type', contentType);

				const token = localStorage.getItem('accessToken');
				if (token) headers.set('Authorization', `${token}`);

				return headers;
			},
		});

		let result = await baseQuery(args, api, options);

		const isJwtExpired =
			result.error &&
			(result.error.data as ErrorResponse).message === 'jwt expired';

		if (isJwtExpired) {
			try {
				await refreshToken();

				result = await baseQuery(args, api, options);
			} catch (err) {
				const token = localStorage.getItem('refreshToken');

				if (token) {
					await api.dispatch(authApi.endpoints.logout.initiate({ token }));
				}
			}
		}

		return result;
	};
};
