import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { currencySymbols } from "../../constants/currencySymbols";

export const CurrencySymbol = (): JSX.Element => {
	const activeCurrency = useSelector(
		(state: RootState) => state.currency.active
	);
	const symbol = currencySymbols[activeCurrency] || "";
	return <span>{symbol}</span>;
};
