import React from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
} from "@mui/material";
import { Rating } from "../Rating";
import { Item } from "../../interfaces/items";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import "./styles.css";
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";

export const ItemCard = ({ item }: { item: Item }) => {
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);
	const { handleAddToCart } = useCartHandlers();

	return (
		<Card className="card col-sm-12 col-md-6 col-lg-6 col-12">
			<CardHeader
				title={item.title}
				subheader={`Category: ${item.category}`}
				sx={{ padding: 0 }}
				titleTypographyProps={{
					sx: { backgroundColor: "black", color: "white", padding: "1rem" },
				}}
				subheaderTypographyProps={{
					sx: { backgroundColor: "grey", color: "white", padding: ".5rem" },
				}}
			/>
			<CardContent>
				<div className="row card-content">
					<div className="img-and-description">
						<img
							src={item.image}
							alt="item"
							className="item-image col-12 col-sm-12 col-md-6 col-lg-6"
						/>
						<div className="description-wrapper col-12 col-sm-12 col-md-6 col-lg-6">
							<div className="description-content">
								<p className="text-short">{item.description}</p>
							</div>
							<Rating rate={item.rate} />
						</div>
					</div>
				</div>
			</CardContent>
			<Divider />
			<CardActions className="action-container">
				<p className="card-price">{(item.price * currencyRate).toFixed(2)}<CurrencySymbol /></p>
				<Button onClick={() => handleAddToCart(item)} className="card-button">
					Add to cart
				</Button>
			</CardActions>
		</Card>
	);
};
