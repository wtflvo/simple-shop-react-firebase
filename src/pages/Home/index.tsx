import React, { useEffect, useState } from "react";

import { items } from "../../constants/items";
import { Category } from "../../interfaces/enums/Category";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useFilterHandlers } from "../../state/handlers/shop/filterHandlers";
import NavBar from "../../components/NavBar";
import { SearchForm } from "../../components/SearchForm";
import { CategoriesToggleBar } from "../../components/CategoriesToggleBar";
import { Footer } from "../../components/Footer";
import CartModal from "../../components/CartModal";

import { Status } from "../../interfaces/enums/Status";
import { ItemSceleton } from "../../components/ItemSceleton";
import { ItemCard } from "../../components/ItemCard";

import { Item } from "../../interfaces/items";
import { ItemModal } from "../../components/ItemModal";
import "./styles.css";

const Home = () => {
	const filteredItems = useSelector(
		(state: RootState) => state.shop.filteredItems
	);
	const itemsStatus = useSelector((state: RootState) => state.shop.status);
	const { handleFilterByCategory, handleFilterByTitle, handleFetchItems } =
		useFilterHandlers();
	const [lastSearch, setLastSearch] = useState("");
	const [category, setCategory] = useState<Category>(Category.ALL);
	const [searchString, setSearchString] = useState("");
	const [isCartModalOpened, setIsCartModalOpened] = useState<boolean>(false);
	const [searchOptions, setSearchOptions] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(itemsStatus === Status.LOADING);
	const [isItemModalOpened, setIsItemModalOpened] = useState(false);
	const [activeItem, setActiveItem] = useState<Item | null>(null);

	useEffect(() => {
		handleFetchItems();
		setSearchOptions(getAllSearchOptions());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setIsLoading(itemsStatus === Status.LOADING);
	}, [itemsStatus]);

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

	const handleCartModalClose = () => {
		setIsCartModalOpened(false);
	};
	const handleCartModalOpen = () => {
		setIsCartModalOpened(true);
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
			<NavBar handleCartModalOpen={handleCartModalOpen} />
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
							{filteredItems.map((item) =>
								isLoading ? (
									<ItemSceleton key={item.id} />
								) : (
									<ItemCard
										item={item}
										key={item.id}
										openDetails={(item: Item) => {
											setActiveItem(item);
											setIsItemModalOpened(true);
										}}
									/>
								)
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
			<CartModal open={isCartModalOpened} onClose={handleCartModalClose} />
			<ItemModal
				onClose={() => setIsItemModalOpened(false)}
				open={isItemModalOpened}
				item={activeItem ?? ({} as Item)}
			/>
		</div>
	);
};

export default Home;
