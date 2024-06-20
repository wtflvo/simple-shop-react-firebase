import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CartItem } from "../../interfaces/items";
import priceCalculator from "../../helpers/priceCalculator.helper";

export const CartIcon = () => {
	const cartItems: CartItem[] = useSelector(
		(state: RootState) => state.shop.cart
	);
	const currencyRate: number = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);
	return (
		<Badge
			color="warning"
			badgeContent={Number(
				priceCalculator.getCartTotal(cartItems, currencyRate)
			)}
			max={999999}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
		>
			<ShoppingCartIcon className="cart-icon" fontSize="large" />
		</Badge>
	);
};
