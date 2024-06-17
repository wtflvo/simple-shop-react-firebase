import { CartItem, Item } from "./items";

export interface ShopInitialState {
	cart: CartItem[];
	filteredItems: Item[];
}
