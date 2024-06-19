import React from "react";
import { useSelector } from "react-redux";
import {
	FormControl,
	Select,
	MenuItem,
	Box,
	SelectChangeEvent,
} from "@mui/material";
import { RootState } from "../../state/store";
import { CurrencyType } from "../../interfaces/enums/CurrencyType";
import { useCurrencyHandlers } from "../../state/handlers/currency/currencyHandler";
import "./styles.css";

export const CurrencySelector: React.FC = () => {
	const { handleCurrencyTypeChange } = useCurrencyHandlers();
	const activeCurrency = useSelector(
		(state: RootState) => state.currency.active
	);

	const handleChange = (event: SelectChangeEvent<CurrencyType>) => {
		handleCurrencyTypeChange(event.target.value as CurrencyType);
	};

	return (
		<Box className="currency-selector-container">
			<FormControl className="currency-selector" size="small" variant="outlined">
				
				<Select
					labelId="currency-select-label"
					id="currency-select"
					value={activeCurrency}
					onChange={handleChange}
				>
					<MenuItem value={CurrencyType.USD}>USD</MenuItem>
					<MenuItem value={CurrencyType.EUR}>EUR</MenuItem>
					<MenuItem value={CurrencyType.UAH}>UAH</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};
