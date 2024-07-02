import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Rating } from "../Rating";
import { Item } from "../../interfaces/items";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";
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
	const cartItems = useSelector((state: RootState) => state.shop.cart);
	const { handleAddToCart } = useCartHandlers();
	const [isInCart, setIsInCart] = useState(false);
	useEffect(() => {
		const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
		if (itemInCart) {
			setIsInCart(true);
		} else {
			setIsInCart(false);
		}
	}, [cartItems, item.id]);

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
				<Tooltip title="Add to cart" arrow>
					<IconButton
						onClick={() => handleAddToCart(item)}
						className="add-button"
					>
						{isInCart ? (
							<ShoppingCartIcon className="add-icon" />
						) : (
							<AddShoppingCartIcon className="add-icon" />
						)}
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
};
