import { CurrencyType } from "../enums/CurrencyType";
import { FormData } from "../FormData";
import { CartItem } from "../items";

export interface FillOrderDataProps {
	cartItems: CartItem[];
	formData: FormData;
	currencyRate: number;
	activeCurrency: CurrencyType;
}
