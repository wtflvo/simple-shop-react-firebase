import { createSlice } from "@reduxjs/toolkit";
import { items } from "../../constants/items";

import { Category } from "../../interfaces/enums/Category";
import { ShopInitialState } from "../../interfaces/initialState";
import sessionStorageHelper from "../../helpers/sessionStorage.helper";
import { Status } from "../../interfaces/enums/Status";
import { fetchItems } from "../thunks/fetchItems";

const initialState: ShopInitialState = {
	cart: sessionStorageHelper.loadCart() || [],
	filteredItems: [],
	status: Status.IDLE,
	error: null,
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

		addToCart: (state, action) => {
			const { id, price, title, image } = action.payload;
			const itemInCart = state.cart.find((cartItem) => cartItem.id === id);
			if (itemInCart) {
				itemInCart.quantity += 1;
			} else {
				state.cart.push({ id, image, title, price, quantity: 1 });
			}
			sessionStorageHelper.saveCart(state.cart);
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
				sessionStorageHelper.saveCart(state.cart);
			}
		},
		deleteFromCart: (state, action) => {
			const itemId = action.payload;
			state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
			sessionStorageHelper.saveCart(state.cart);
		},
		clearCart: (state) => {
			state.cart = [];
			sessionStorageHelper.saveCart(state.cart);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchItems.pending, (state) => {
				state.status = Status.LOADING;
			})
			.addCase(fetchItems.fulfilled, (state, action) => {
				state.status = Status.SUCCEEDED;
				state.filteredItems = action.payload;
			})
			.addCase(fetchItems.rejected, (state, action) => {
				state.filteredItems = items;
				state.status = Status.FAILED;
				state.error = action.payload as string;
			});
	},
});

export const {
	filterByCategory,
	filterByTitle,
	addToCart,
	removeFromCart,
	deleteFromCart,
	clearCart,
} = shopSlice.actions;
export default shopSlice.reducer;
