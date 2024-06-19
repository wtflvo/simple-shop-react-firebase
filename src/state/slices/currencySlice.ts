import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrencyType } from "../../interfaces/enums/CurrencyType";

import { CurrencyInitialState } from "../../interfaces/initialState";
import { Status } from "../../interfaces/enums/Status";
import { fetchCurrenciesValue } from "../handlers/currency/currencyThunk";

const initialState: CurrencyInitialState = {
	currenciesValue: {
		uah: 0,
		usd: 1,
		eur: 0,
	},
	active: CurrencyType.USD,
	status: Status.IDLE,
	error: null,
};

const currencySlice = createSlice({
	name: "currency",
	initialState,
	reducers: {
		setActiveCurrency: (state, action: PayloadAction<CurrencyType>) => {
			state.active = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrenciesValue.pending, (state) => {
				state.status = Status.LOADING;
				state.error = null;
			})
			.addCase(fetchCurrenciesValue.fulfilled, (state, action) => {
				state.status = Status.SUCCEEDED;
				state.currenciesValue = { ...action.payload };
			})
			.addCase(fetchCurrenciesValue.rejected, (state, action) => {
				state.status = Status.FAILED;
				state.error = action.payload as string;
			});
	},
});

export const { setActiveCurrency } = currencySlice.actions;
export default currencySlice.reducer;
