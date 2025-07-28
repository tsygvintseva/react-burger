import { describe, it, expect, beforeEach } from 'vitest';
import { setIsAuthChecked, setUser, userSlice } from './reducer';

describe('userSlice', () => {
	let initialState: ReturnType<typeof userSlice.getInitialState>;

	beforeEach(() => {
		initialState = userSlice.getInitialState();
	});

	it('should return initial state', () => {
		expect(initialState).toEqual({
			user: null,
			isAuthChecked: false,
		});
	});

	it('should handle setUser', () => {
		const newUser = { email: 'test@example.com', name: 'Test User' };
		const nextState = userSlice.reducer(initialState, setUser(newUser));

		expect(nextState.user).toEqual(newUser);
	});

	it('should handle setIsAuthChecked', () => {
		const nextState = userSlice.reducer(initialState, setIsAuthChecked(true));

		expect(nextState.isAuthChecked).toBe(true);
	});
});
