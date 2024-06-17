import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const CartIcon = () => {
	const cartSize = useSelector((state: RootState) => state.shop.cart.length);
	return (
		<Badge color="warning" badgeContent={cartSize} showZero>
			<ShoppingCartIcon />
		</Badge>
	);
};
