import { EIngredientType } from './enums';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const tabs = [
	{
		value: EIngredientType.Bun,
		name: 'Булки',
	},
	{
		value: EIngredientType.Sauce,
		name: 'Соусы',
	},
	{
		value: EIngredientType.Main,
		name: 'Начинки',
	},
];
