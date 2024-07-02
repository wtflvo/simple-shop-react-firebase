import React from "react";
import { useSelector } from "react-redux";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
} from "@mui/material";
import { Rating } from "../Rating";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";
import { FullItemCardProps } from "../../interfaces/props/FullItemCardProps";
import { AddButton } from "../AddButton";
import "./styles.css";

export const FullItemCard = ({ item, closeModal }: FullItemCardProps) => {
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);

	const { handleAddToCart } = useCartHandlers();

	return (
		<Card className="full-card">
			<CardHeader
				title={item.title}
				sx={{ padding: 0 }}
				titleTypographyProps={{
					sx: {
						padding: ".5rem 1rem",
						cursor: "default",
					},
				}}
			/>
			<CardContent>
				<div className="row card-content">
					<div className="img-and-description">
						<span className="card-img-wrapper">
							<img src={item.image} alt="item" className="item-image " />
							<div className="category-overlay">
								<p>{item.category}</p>
							</div>
						</span>
						<div className="description-wrapper">
							<div className="description-content">
								<p className="text-short">{item.description}</p>
							</div>
						</div>
					</div>
				</div>
				
			</CardContent>
			<Rating rate={item.rate} />
			<Divider />
			<CardActions className="action-container">
				<p className="card-price">
					{(item.price * currencyRate).toFixed(2)}
					<CurrencySymbol />
				</p>
				<AddButton
					itemId={item.id}
					handleAdd={() => {
						handleAddToCart(item);
						closeModal();
					}}
				/>
			</CardActions>
		</Card>
	);
};
