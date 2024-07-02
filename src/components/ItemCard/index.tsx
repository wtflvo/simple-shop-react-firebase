import React from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	
} from "@mui/material";

import { Rating } from "../Rating";
import { Item } from "../../interfaces/items";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";
import { AddButton } from "../AddButton";
import "./styles.css";

export const ItemCard = ({
	item,
	openDetails,
}: {
	item: Item;
	openDetails: (item: Item) => void;
}) => {
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);

	const { handleAddToCart } = useCartHandlers();

	return (
		<Card className="card">
			<CardContent>
				<div className="row card-content">
					<div className="img-and-description">
						<span className="card-img-wrapper">
							<img src={item.image} alt="item" className="item-image " />
							<div className="category-overlay">
								<p>{item.category}</p>
							</div>
						</span>
					</div>
				</div>
			</CardContent>
			<div className="card-title-wrapper">
				<h5 className="card-title">{item.title}</h5>
			</div>

			<div>
				<Rating rate={item.rate} />
			</div>
			<p className="card-price">
				{(item.price * currencyRate).toFixed(2)}
				<CurrencySymbol />
			</p>
			<Divider />
			<CardActions className="action-container">
				<Button onClick={() => openDetails(item)}>Details</Button>
				<AddButton itemId={item.id} handleAdd={() => handleAddToCart(item)} />
			</CardActions>
		</Card>
	);
};
