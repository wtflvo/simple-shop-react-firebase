import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { setActiveCurrency } from "../../slices/currencySlice";
import { CurrencyType } from "../../../interfaces/enums/CurrencyType";
import { fetchCurrenciesValue } from "../../thunks/fetchCurrenciesValue";

export const useCurrencyHandlers = () => {
	const dispatch = useDispatch();

	const handleCurrencyTypeChange = (value: CurrencyType) => {
		dispatch(setActiveCurrency(value));
	};

	const handleFetchCurrenciesValue = () => {
		dispatch(fetchCurrenciesValue() as unknown as AnyAction);
	};

	return {
		handleCurrencyTypeChange,
		handleFetchCurrenciesValue,
	};
};
