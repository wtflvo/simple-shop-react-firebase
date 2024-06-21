import { createAsyncThunk } from "@reduxjs/toolkit";
import downloadItems from "../../db/import/downloadItems";

export const fetchItems = createAsyncThunk(
	"shop/downloadItems",
	async (_, { rejectWithValue }) => {
		try {
			const fetchedItems = await downloadItems();

			return fetchedItems;
		} catch (error: any) {
			return rejectWithValue(error.message as string);
		}
	}
);
