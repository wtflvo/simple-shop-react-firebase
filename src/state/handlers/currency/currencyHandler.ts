import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { setActiveCurrency } from "../../slices/currencySlice";
import { CurrencyType } from "../../../interfaces/enums/CurrencyType";
import { fetchCurrenciesValue } from "../../thunks/fetchCurrenciesValue";
import { useCallback } from "react";

export const useCurrencyHandlers = () => {
	const dispatch = useDispatch();

	const handleCurrencyTypeChange = useCallback(
		(value: CurrencyType) => {
			dispatch(setActiveCurrency(value));
		},
		[dispatch]
	);

	const handleFetchCurrenciesValue = useCallback(() => {
		dispatch(fetchCurrenciesValue() as unknown as AnyAction);
	}, [dispatch]);

	return {
		handleCurrencyTypeChange,
		handleFetchCurrenciesValue,
	};
};
