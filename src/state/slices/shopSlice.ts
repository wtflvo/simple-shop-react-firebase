import { createSlice } from "@reduxjs/toolkit";
import { items } from "../../constants/items";
import { Item } from "../../interfaces/Item";
import { Category } from "../../interfaces/enums/Filter";

interface CartItem {
	itemId: number;
	quantity: number;
}

interface InitialState {
	cart: CartItem[];
	filteredItems: Item[];
}

const initialState: InitialState = {
	cart: [],
	filteredItems: items,
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		filterByCategory: (state, action) => {
			const category: Category = action.payload;
			if (category === Category.ALL) {
				state.filteredItems = items;
			} else {
				state.filteredItems = items.filter(
					(item) => item.category === category
				);
			}
		},
		filterByTitle: (state, action) => {
			const title = action.payload;
			state.filteredItems = items.filter((item) =>
				item.title.toLowerCase().includes(title.toLowerCase())
			);
		},
		resetFilters: (state) => {
			state.filteredItems = items;
		},
		addToCart: (state, action) => {
			const itemId = action.payload;
			const itemInCart = state.cart.find(
				(cartItem) => cartItem.itemId === itemId
			);
			if (itemInCart) {
				itemInCart.quantity += 1;
			} else {
				state.cart.push({ itemId, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			const itemInCart = state.cart.find(
				(cartItem) => cartItem.itemId === itemId
			);
			if (itemInCart) {
				if (itemInCart.quantity > 1) {
					itemInCart.quantity -= 1;
				} else {
					state.cart = state.cart.filter(
						(cartItem) => cartItem.itemId !== itemId
					);
				}
			}
		},
	},
});

export const {
	filterByCategory,
	filterByTitle,
	resetFilters,
	addToCart,
	removeFromCart,
} = shopSlice.actions;
export default shopSlice.reducer;
