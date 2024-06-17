import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CartItem, OrderItem } from "../../interfaces/items";
import { OrderData } from "../../interfaces/OrderData";
import './styles.css';

export const ClientForm = () => {
	const cartData = useSelector((state: RootState) => state.shop.cart);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const orderItems: OrderItem[] = cartData.map((cartItem: CartItem) => ({
			id: cartItem.id,
			title: cartItem.title,
			price: cartItem.price,
			quantity: cartItem.quantity,
			totalPrice: Number((cartItem.price * cartItem.quantity).toFixed(2)),
		}));

		const orderData: OrderData = {
			name,
			surname,
			address,
			phone,
			orderedGoods: {
				items: orderItems,
				total: orderItems.reduce((acc, item) => acc + item.totalPrice, 0),
			},
		};

		console.log(orderData);
	};

	return (
		<Box className="client-form-container">
			<form className="client-form" onSubmit={handleSubmit}>
				<TextField
					label="Name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					label="Surname"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
				/>
				<TextField
					label="Address"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<TextField
					label="Phone"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<Button type="submit" variant="contained" color="primary">
					Order
				</Button>
			</form>
		</Box>
	);
};
