import { createAsyncThunk } from "@reduxjs/toolkit";


import currenciesApiHelper from "../../../helpers/currencyApi.helper";
import { CurrenciesValue } from "../../../interfaces/CurrenciesValue";

export const fetchCurrenciesValue = createAsyncThunk<
    CurrenciesValue,
    void,
    { rejectValue: string }
>("currency/fetchCurrenciesValue", async (_, { rejectWithValue }) => {
    try {
        const currenciesValue = await currenciesApiHelper.getCurrenciesValue();
        return currenciesValue;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Failed to fetch currencies");
    }
});