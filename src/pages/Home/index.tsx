import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	TextField,
	Button,
	Pagination,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";

import { Item } from "../../interfaces/Item";
import { ItemCard } from "../../components/ItemCard";
import { items } from "../../constants/items";
import "./styles.css";
import { Category } from "../../interfaces/enums/Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useShopHandlers } from "../../state/handlers/shopHandlers";

const Home = () => {
	const dispatch = useDispatch();
	const filteredItems = useSelector(
		(state: RootState) => state.shop.filteredItems
	);
	const { handleFilterByCategory, handleFilterByTitle, handleResetFilters } =
		useShopHandlers();
	const [lastSearch, setLastSearch] = useState("");
	const [category, setCategory] = useState<Category>(Category.ALL);
	const [searchString, setSearchString] = useState("");
	const [searchOptions, setSearchOptions] = useState(filteredItems);
	const [page, setPage] = useState(0);

	useEffect(() => {
		setSearchOptions(filteredItems);
	}, [filteredItems]);

	const changeCategory = (
		event: React.MouseEvent<HTMLElement>,
		newCategory: Category
	) => {
		setCategory(newCategory);
		handleFilterByCategory(newCategory);
		setLastSearch("");
	};

	// const handleSearchSubmit = (e) => {
	// 	e.preventDefault();
	// 	dispatch(filterByTitle(searchString));
	// 	setLastSearch(searchString);
	// };

	// const handleSearchChange = (event) => {
	// 	setSearchString(event.target.value);
	// };

	// const handlePageChange = (event, newPage) => {
	// 	setPage(newPage);
	// };

	return (
		<div>
			<div className="info-container">
				<div className="header-container">
					<h1>Random Items Shop</h1>
				</div>
				<div className="content-container">
					<div className="search-container">
						{/* <form onSubmit={handleSearchSubmit}>
							<Autocomplete
								options={searchOptions}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Search"
										variant="outlined"
										onChange={handleSearchChange}
									/>
								)}
							/>
							<Button type="submit" variant="contained">
								Search
							</Button>
						</form> */}
					</div>
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
