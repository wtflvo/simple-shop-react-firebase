import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice";

const store = configureStore({
	reducer: {
		shop: shopReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;


