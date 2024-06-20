import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { filterByCategory, filterByTitle } from "../../slices/shopSlice";
import { Category } from "../../../interfaces/enums/Category";
import { fetchItems } from "../../thunks/fetchItems";


export const useFilterHandlers = () => {
	const dispatch = useDispatch();

	const handleFetchItems = () => {
		dispatch(fetchItems() as unknown as AnyAction);
	};

	const handleFilterByCategory = (category: Category) => {
		dispatch(filterByCategory(category));
	};

	const handleFilterByTitle = (title: string) => {
		dispatch(filterByTitle(title));
	};

	return {
		handleFilterByCategory,
		handleFilterByTitle,
		handleFetchItems,
	};
};
