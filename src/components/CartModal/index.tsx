import React from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "../../state/store";

import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { CartItem } from "../../interfaces/items";

import { CartModalProps } from "../../interfaces/props/CartModalProps";
import "./styles.css";

export const CartModal: React.FC<CartModalProps> = ({ open, onClose }) => {
	const cartItems: CartItem[] = useSelector(
		(state: RootState) => state.shop.cart
	);

	const { handleAddToCart, handleRemoveFromCart, handleDeleteFromCart } =
		useCartHandlers();

	return (
		<Modal open={true} onClose={onClose} aria-labelledby="cart-modal-title">
			<Box className="cart-modal">
				<Box className="cart-modal-header">
					<Typography variant="h6" id="cart-modal-title">
						Your Cart
					</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box className="cart-modal-content">
					{cartItems.length === 0 ? (
						<Typography>Your cart is empty.</Typography>
					) : (
						cartItems.map((item) => (
							<Box key={item.id} className="cart-item">
								<Box className="cart-item-details">
									<img
										src={item.image}
										alt={item.title}
										className="cart-item-image"
									/>
									<Typography>{item.title}</Typography>
									<Typography>Price: ${item.price}</Typography>
									<Typography>Quantity: {item.quantity}</Typography>
								</Box>
								<Box className="cart-item-actions">
									<IconButton onClick={() => handleAddToCart(item)}>
										<AddIcon />
									</IconButton>
									<IconButton onClick={() => handleRemoveFromCart(item.id)}>
										<RemoveIcon />
									</IconButton>
									<IconButton onClick={() => handleDeleteFromCart(item.id)}>
										<DeleteIcon />
									</IconButton>
								</Box>
							</Box>
						))
					)}
				</Box>
				<Box className="cart-modal-footer">
					<Button variant="contained" color="primary" onClick={onClose}>
						Checkout
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default CartModal;
