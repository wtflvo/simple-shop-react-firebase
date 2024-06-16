import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	TextField,
	Button,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";

import { ItemCard } from "../../components/ItemCard";
import { items } from "../../constants/items";
import { Category } from "../../interfaces/enums/Filter";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useShopHandlers } from "../../state/handlers/shopHandlers";
import "./styles.css";
import NavBar from "../../components/NavBar";
import { Search } from "@mui/icons-material";
import { SearchForm } from "../../components/SearchForm";
import { CategoriesToggleBar } from "../../components/CategoriesToggleBar";
import { Footer } from "../../components/Footer";

const Home = () => {
	const filteredItems = useSelector(
		(state: RootState) => state.shop.filteredItems
	);
	const { handleFilterByCategory, handleFilterByTitle, handleResetFilters } =
		useShopHandlers();
	const [lastSearch, setLastSearch] = useState("");
	const [category, setCategory] = useState<Category>(Category.ALL);
	const [searchString, setSearchString] = useState("");
	const [searchOptions, setSearchOptions] = useState<string[]>([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		setSearchOptions(getAllSearchOptions());
	}, []);
	useEffect(() => {
		const allOptions = getAllSearchOptions();
		const filteredOptions = allOptions.filter((value) =>
			value.includes(searchString)
		);
		setSearchOptions(filteredOptions);
	}, [searchString]);

	const getAllSearchOptions = () => {
		const uniqueTitles = new Set<string>();
		items.forEach((item) => uniqueTitles.add(item.title.toLowerCase()));
		return Array.from(uniqueTitles);
	};

	const changeCategory = (
		event: React.MouseEvent<HTMLElement>,
		newCategory: Category
	) => {
		setCategory(newCategory);
		handleFilterByCategory(newCategory);
		setLastSearch("");
	};

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleFilterByTitle(searchString);
		setLastSearch(searchString);
	};

	const handleSearchChange = (event: React.ChangeEvent<{}>, value: string) => {
		setSearchString(value);
	};

	return (
		<div className="home-page_container">
			<NavBar />
			<div className="home-page_main">
				<SearchForm
					handleSearchSubmit={handleSearchSubmit}
					handleSearchChange={handleSearchChange}
					searchOptions={searchOptions}
				/>
				<div className="main_filters-and_items">
					<CategoriesToggleBar
						category={category}
						changeCategory={changeCategory}
					/>
					<div className="main_items">
						{lastSearch && (
							<div className="search-results_count">
								<h5>
									Search results for "{lastSearch}": {filteredItems.length}
								</h5>
							</div>
						)}
						<div className="grid-content">
							{filteredItems.map((item) => (
								<ItemCard item={item} key={item.id} />
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
