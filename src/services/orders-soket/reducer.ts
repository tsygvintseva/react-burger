import { EWSConnectionStatus } from '@/utils/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TWSConnectionStatus =
	| EWSConnectionStatus.Idle
	| EWSConnectionStatus.Connecting
	| EWSConnectionStatus.Open
	| EWSConnectionStatus.Receiving
	| EWSConnectionStatus.Error
	| EWSConnectionStatus.Closed;

const initialState = 'idle' as TWSConnectionStatus;

export const wsStatusSlice = createSlice({
	name: 'wsStatusSlice',
	initialState,
	reducers: {
		setWSStatus: (_state, action: PayloadAction<TWSConnectionStatus>) =>
			action.payload,
	},
});

export const { setWSStatus } = wsStatusSlice.actions;
