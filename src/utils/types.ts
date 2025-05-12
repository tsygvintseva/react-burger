import { EIngredientType } from './enums';

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
