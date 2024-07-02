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
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";
import "./styles.css";

export const FullItemCard = ({
	item,
	closeModal,
}: {
	item: Item;
	closeModal: () => void;
}) => {
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);

	const { handleAddToCart } = useCartHandlers();

	return (
		<Card className="full-card">
			<CardHeader
				title={item.title}
				subheader={`Category: ${item.category}`}
				sx={{ padding: 0 }}
				titleTypographyProps={{
					sx: {
						backgroundColor: "black",
						color: "white",
						padding: "1rem",
						cursor: "default",
					},
				}}
				subheaderTypographyProps={{
					sx: {
						backgroundColor: "grey",
						color: "white",
						padding: ".5rem",
						cursor: "default",
					},
				}}
			/>
			<CardContent>
				<div className="row card-content">
					<div className="img-and-description">
						<span className="card-img-wrapper">
							<img src={item.image} alt="item" className="item-image " />
						</span>
						<div className="description-wrapper">
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
				<p className="card-price">
					{(item.price * currencyRate).toFixed(2)}
					<CurrencySymbol />
				</p>
				<Button
					onClick={() => {
						handleAddToCart(item);
						closeModal();
					}}
					className="card-button"
				>
					Add to cart
				</Button>
			</CardActions>
		</Card>
	);
};
