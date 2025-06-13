import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
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
				api.dispatch({ type: 'auth/logout' });
			}
		}

		return result;
	};
};
