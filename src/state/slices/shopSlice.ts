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
        
	},
});

export const { filterByCategory, filterByTitle, resetFilters } = shopSlice.actions;
export default shopSlice.reducer;
