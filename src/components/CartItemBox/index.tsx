import React from "react";
import { Box, Typography, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { CartItem } from "../../interfaces/items";
import "./styles.css";

export const CartItemBox = ({ item }: { item: CartItem }) => {
	const { handleAddToCart, handleRemoveFromCart, handleDeleteFromCart } =
		useCartHandlers();
	return (
		<Box className="cart-item">
			<Box className="cart-item-details">
				<img src={item.image} alt={item.title} className="cart-item-image" />
				<Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
			</Box>
			<Box className="cart-item-actions-container">
				<Typography>${item.price.toFixed(2)}</Typography>
				<Typography>x</Typography>
				<Box className="cart-item-actions">
					<IconButton onClick={() => handleAddToCart(item)}>
						<AddIcon color="success" />
					</IconButton>
					<Typography sx={{ fontWeight: "bold" }}> {item.quantity}</Typography>
					<IconButton onClick={() => handleRemoveFromCart(item.id)}>
						<RemoveIcon color="warning" />
					</IconButton>
				</Box>
			</Box>
			<Typography sx={{ fontWeight: "bold", color: "green" }}>
				${(item.price * item.quantity).toFixed(2)}
			</Typography>
			<IconButton onClick={() => handleDeleteFromCart(item.id)}>
				<DeleteIcon color="error" />
			</IconButton>
		</Box>
	);
};
