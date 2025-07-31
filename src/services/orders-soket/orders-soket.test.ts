import { describe, it, expect } from 'vitest';

import { EWSConnectionStatus } from '@/utils/enums';
import { setWSStatus, wsStatusSlice } from './reducer';

describe('wsStatusSlice', () => {
	const initialState = wsStatusSlice.getInitialState();

	it('should return initial state', () => {
		expect(initialState).toBe(EWSConnectionStatus.Idle);
	});

	it('should handle setWSStatus', () => {
		const nextState = wsStatusSlice.reducer(
			initialState,
			setWSStatus(EWSConnectionStatus.Connecting)
		);

		expect(nextState).toBe(EWSConnectionStatus.Connecting);
	});
});
