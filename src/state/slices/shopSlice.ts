import { createSlice } from "@reduxjs/toolkit";
import { items } from "../../constants/items";

import { Category } from "../../interfaces/enums/Filter";
import { ShopInitialState } from "../../interfaces/ShopInitialState";

const initialState: ShopInitialState = {
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
			const { id, price, title, image } = action.payload;
			const itemInCart = state.cart.find((cartItem) => cartItem.id === id);
			if (itemInCart) {
				itemInCart.quantity += 1;
			} else {
				state.cart.push({ id, image, title, price, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			const itemId = action.payload;
			const itemInCart = state.cart.find((cartItem) => cartItem.id === itemId);
			if (itemInCart) {
				if (itemInCart.quantity > 1) {
					itemInCart.quantity -= 1;
				} else {
					state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
				}
			}
		},
		deleteFromCart: (state, action) => {
			const itemId = action.payload;
			state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
		},
	},
});

export const {
	filterByCategory,
	filterByTitle,
	resetFilters,
	addToCart,
	removeFromCart,
	deleteFromCart,
} = shopSlice.actions;
export default shopSlice.reducer;
