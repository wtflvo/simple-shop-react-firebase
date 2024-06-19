import { useDispatch } from "react-redux";
import { setActiveCurrency } from "../../slices/currencySlice";
import { CurrencyType } from "../../../interfaces/enums/CurrencyType";

export const useCurrencyHandlers = () => {
	const dispatch = useDispatch();

	const handleCurrencyTypeChange = (value: CurrencyType) => {
		dispatch(setActiveCurrency(value));
	};

	return {
		handleCurrencyTypeChange,
	};
};
