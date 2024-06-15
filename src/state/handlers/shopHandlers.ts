// src/handlers/shopHandlers.js
import { useDispatch } from "react-redux";
import {
	filterByCategory,
	filterByTitle,
	resetFilters,
} from "../slices/shopSlice";
import { Category } from "../../interfaces/enums/Filter";

export const useShopHandlers = () => {
	const dispatch = useDispatch();

	const handleFilterByCategory = (category: Category) => {
		dispatch(filterByCategory(category));
	};

	const handleFilterByTitle = (title: string) => {
		dispatch(filterByTitle(title));
	};

	const handleResetFilters = () => {
		dispatch(resetFilters());
	};

	return {
		handleFilterByCategory,
		handleFilterByTitle,
		handleResetFilters,
	};
};
