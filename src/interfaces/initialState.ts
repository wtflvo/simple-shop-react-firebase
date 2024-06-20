import { CurrenciesValue } from "./CurrenciesValue";
import { CurrencyType } from "./enums/CurrencyType";
import { Status } from "./enums/Status";
import { CartItem, Item } from "./items";

export interface ShopInitialState {
	cart: CartItem[];
	filteredItems: Item[];
	status: Status;
	error: string | null;
}

export interface CurrencyInitialState {
	currenciesValue: CurrenciesValue;
	active: CurrencyType;
	status: Status;
	error: string | null;

}
