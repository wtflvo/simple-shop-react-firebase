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

	const handleSearchChange = (
		event: React.ChangeEvent<{}>,
		value: string
	  ) => {
		setSearchString(value);
	  };

	// const handlePageChange = (event, newPage) => {
	// 	setPage(newPage);
	// };

	return (
		<div>
			<div className="info-container">
				<NavBar />
				<div className="content-container">
					<SearchForm handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} searchOptions={searchOptions}/>
					<div className="main-box">
						<div>
							<h3>Categories:</h3>
							<ToggleButtonGroup
								value={category}
								exclusive
								onChange={(event, newCategory) =>
									changeCategory(event, newCategory as Category)
								}
								aria-label="category"
								orientation="vertical"
								sx={{
									"& .MuiToggleButton-root": {
										color: "black", // Text color for the buttons
										borderColor: "black", // Border color for the buttons
										"&.Mui-selected": {
											color: "white", // Text color when selected
											backgroundColor: "black", // Background color when selected
										},
										"&:hover": {
											backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color on hover
										},
									},
								}}
							>
								<ToggleButton value={Category.ALL}>All categories</ToggleButton>
								<ToggleButton value={Category.MEN_S_CLOTHING}>
									Men's clothing
								</ToggleButton>
								<ToggleButton value={Category.WOMEN_S_CLOTHING}>
									Women's clothing
								</ToggleButton>
								<ToggleButton value={Category.JEWELERY}>Jewelery</ToggleButton>
								<ToggleButton value={Category.ELECTRONICS}>
									Electronics
								</ToggleButton>
							</ToggleButtonGroup>
						</div>
						<div>
							{lastSearch && (
								<h5>
									Search results for "{lastSearch}": {filteredItems.length}
								</h5>
							)}
							<div className="grid-content">
								{filteredItems.map((item) => (
									<ItemCard item={item} key={item.id} />
								))}
							</div>
							{/* <div className="paginator">
								<Pagination
									count={Math.ceil(filteredItems.length / 6)}
									page={page + 1}
									onChange={handlePageChange}
									color="primary"
								/>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
