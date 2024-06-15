import React, { useEffect, useState } from "react";
// import { useForm, Controller } from 'react-hook-form';
import {
	Autocomplete,
	TextField,
	Button,
	Pagination,
	Slider,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
// import { getItemCount, getItems } from './fakeShopApiService'; // Assuming you have these functions to fetch data

import { Item } from "../../interfaces/Item";
import { ItemCard } from "../../components/ItemCard";
import { items } from "../../constants/items";
import "./styles.css";

const Home = () => {
	//   const { control, handleSubmit, reset } = useForm();
	const [itemsQuantity, setItemsQuantity] = useState(0);
	const [filteredShopItems, setFilteredShopItems] = useState<Item[]>(items);
	const [lastSearch, setLastSearch] = useState("");
	const [category, setCategory] = useState("all");
	const [sliderValues, setSliderValues] = useState([300, 400]);
	const [searchString, setSearchString] = useState("");
	const [searchOptions, setSearchOptions] = useState(items);
	const [page, setPage] = useState(0);

	const fetchItems = (requestData) => {
		// const count = getItemCount(requestData);
		// 	if (count > 0) {
		// 		const items = getItems(requestData);
		// 		setFilteredShopItems(items);
		// 	}
		// 	setItemsQuantity(count);
		// };
		setFilteredShopItems(items);
	};

	useEffect(() => {
		const requestData = { category: "all", page: 0, title: "" };
		fetchItems(requestData);
	}, []);

	const handleCategoryChange = async (event) => {
		const newCategory = event.target.value;
		setCategory(newCategory);
		const requestData = { category: newCategory, page: 0, title: "" };
		fetchItems(requestData);
		setLastSearch("");
	};

	const onSliderChange = (event, newValue) => {
		setSliderValues(newValue);
	};

	const handleSearchSubmit = () => {
		const requestData = { category, page: 0, title: searchString };
		setLastSearch(searchString);
		console.log(requestData);
	};

	const handleSearchChange = (event) => {
		setSearchString(event.target.value);
		// const requestData = { category, page: 0, title: data.search };
		// setLastSearch(data.search);
		// fetchItems(requestData);
	};

	const handlePageChange = async (event, newPage) => {
		const requestData = { category, page: newPage * 6, title: "" };
		setPage(newPage);
		fetchItems(requestData);
	};

	return (
		<div>
			<div className="info-container">
				<div className="header-container">
					<h1>Random Items Shop</h1>
				</div>
				<div className="content-container">
					<div className="search-container">
						<form onSubmit={handleSearchSubmit}>
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
						</form>
					</div>

					<div className="main-box">
						<div>
							<h3>Categories:</h3>
							<ToggleButtonGroup
								value={category}
								exclusive
								onChange={handleCategoryChange}
								aria-label="category"
								orientation="vertical"
							>
								<ToggleButton value="all">All categories</ToggleButton>
								<ToggleButton value="men's clothing">
									Men's clothing
								</ToggleButton>
								<ToggleButton value="women's clothing">
									Women's clothing
								</ToggleButton>
								<ToggleButton value="jewelery">Jewelery</ToggleButton>
								<ToggleButton value="electronics">Electronics</ToggleButton>
							</ToggleButtonGroup>
						</div>
						
						<div>
							{lastSearch && (
								<h5>
									Search results for "{lastSearch}": {itemsQuantity}
								</h5>
							)}
							<div className="grid-content">
								{filteredShopItems.map((item) => (
									<ItemCard item={item} key={item.id} />
								))}
							</div>
							<div className="paginator">
								<Pagination
									count={Math.ceil(itemsQuantity / 6)}
									page={page + 1}
									onChange={handlePageChange}
									color="primary"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
