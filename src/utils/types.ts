import { rootReducer } from '@/services/store';
import { EIngredientType, EOrderStatus } from './enums';
import {
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { userSlice } from '@/services/user/reducer';
import { constructorDataSlice } from '@/services/constructor-data/reducer';

export type TIngredient = {
	_id: string;
	name: string;
	type: EIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TIngredientUniq = TIngredient & {
	key: string;
};

export type TOrder = {
	name: string;
	order: {
		number: number;
	};
};

export type TWSOrder = {
	_id: string;
	ingredients: string[];
	status: EOrderStatus;
	name: string;
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type ApiResponse<T> = {
	success: boolean;
} & T;

export type ErrorResponse = ApiResponse<{
	message: string;
}>;

type UserActions = ReturnType<
	(typeof userSlice.actions)[keyof typeof userSlice.actions]
>;

type ConstructorActions = ReturnType<
	(typeof constructorDataSlice.actions)[keyof typeof constructorDataSlice.actions]
>;

type AppActions = UserActions | ConstructorActions;

export type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
