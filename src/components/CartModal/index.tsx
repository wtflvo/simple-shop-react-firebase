import React from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../state/store";
import { CartItem } from "../../interfaces/items";
import { CartItemBox } from "../CartItemBox";
import { CartModalProps } from "../../interfaces/props/CartModalProps";
import { ClientForm } from "../ClientForm";
import "./styles.css";

export const CartModal: React.FC<CartModalProps> = ({ open, onClose }) => {
	const cartItems: CartItem[] = useSelector(
		(state: RootState) => state.shop.cart
	);

	return (
		<Modal open={open} onClose={onClose} aria-labelledby="cart-modal-title">
			<Box className="cart-modal">
				<Box className="cart-modal-header">
					<Typography
						variant="h6"
						sx={{ fontWeight: "bold" }}
						id="cart-modal-title"
					>
						Your Cart
					</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box className="cart-modal-content">
					{cartItems.length > 0 ? (
						<>
							<Box className="cart-items-container">
								{cartItems.map((item) => (
									<CartItemBox key={item.id} item={item} />
								))}
							</Box>
							<ClientForm />
						</>
					) : (
						<Typography>Your cart is empty.</Typography>
					)}
				</Box>
				<Box className="cart-modal-footer">
					{cartItems.length > 0 && (
						<Typography sx={{ fontWeight: "bold" }} variant="h6">
							Total: $
							{cartItems
								.reduce((acc, item) => acc + item.price * item.quantity, 0)
								.toFixed(2)}
						</Typography>
					)}
					<Button variant="contained" color="warning" onClick={onClose}>
						Continue Shopping
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default CartModal;
