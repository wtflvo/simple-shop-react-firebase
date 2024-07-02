import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "./styles.css";

export const AddButton = ({
	itemId,
	handleAdd,
}: {
	itemId: string;
	handleAdd: () => void;
}) => {
	const cartItems = useSelector((state: RootState) => state.shop.cart);

	const [isInCart, setIsInCart] = useState(false);
	useEffect(() => {
		const itemInCart = cartItems.find((cartItem) => cartItem.id === itemId);

		setIsInCart(itemInCart ? true : false);
	}, [cartItems, itemId]);

	return (
		<Tooltip title="Add to cart" arrow>
			<IconButton onClick={handleAdd} className="add-button">
				{isInCart ? (
					<ShoppingCartIcon className="add-icon" />
				) : (
					<AddShoppingCartIcon className="add-icon" />
				)}
			</IconButton>
		</Tooltip>
	);
};
