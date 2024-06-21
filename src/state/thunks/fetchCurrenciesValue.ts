import { createAsyncThunk } from "@reduxjs/toolkit";

import currenciesApiHelper from "../../helpers/currencyApi.helper";
import { CurrenciesValue } from "../../interfaces/CurrenciesValue";
import { toast } from "react-toastify";

export const fetchCurrenciesValue = createAsyncThunk<
	CurrenciesValue,
	void,
	{ rejectValue: string }
>("currency/fetchCurrenciesValue", async (_, { rejectWithValue }) => {
	try {
		const currenciesValue = await currenciesApiHelper.getCurrenciesValue();
		return currenciesValue;
	} catch (error: any) {
		toast.error("Failed to fetch currencies. Error" + error.message);
		return rejectWithValue(error.message as string);
	}
});
