import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice";
import currencyReducer from "./slices/currencySlice";

const store = configureStore({
	reducer: {
		shop: shopReducer,
		currency: currencyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;


