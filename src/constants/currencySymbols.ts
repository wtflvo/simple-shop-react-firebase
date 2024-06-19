import { CurrencyType } from "../interfaces/enums/CurrencyType";

export const currencySymbols: { [key in CurrencyType]: string } = {
	[CurrencyType.USD]: "$",
	[CurrencyType.EUR]: "€",
	[CurrencyType.UAH]: "₴",
};
