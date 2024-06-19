import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../state/store";
import { CartItem, OrderItem } from "../../interfaces/items";
import { CartItemBox } from "../CartItemBox";
import { CartModalProps } from "../../interfaces/props/CartModalProps";
import { ClientForm } from "../ClientForm";
import { OrderData } from "../../interfaces/OrderData";
import { FormData } from "../../interfaces/FormData";
import validationHelper from "../../helpers/validation.helper";
import "./styles.css";
import { CurrencySymbol } from "../CurrencySymbol";

export const CartModal: React.FC<CartModalProps> = ({ open, onClose }) => {
	const cartItems: CartItem[] = useSelector(
		(state: RootState) => state.shop.cart
	);
	const activeCurrency = useSelector(
		(state: RootState) => state.currency.active
	);
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[activeCurrency]
	);

	const [formData, setFormData] = useState<FormData>({
		name: "",
		surname: "",
		address: "",
		phone: "",
	});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const { name, surname, address, phone } = formData;
		const isValidPhone = phone.length === 12;
		const isValidForm =
			name.length > 0 &&
			surname.length > 0 &&
			address.length > 0 &&
			isValidPhone;
		setIsFormValid(isValidForm);
	}, [formData]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "phone") {
			const phoneValid = validationHelper.checkPhone(value);
			if (!phoneValid) {
				return;
			}
		}
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleOrder = (event: React.FormEvent) => {
		event.preventDefault();

		const orderItems: OrderItem[] = cartItems.map((cartItem: CartItem) => ({
			id: cartItem.id,
			title: cartItem.title,
			price: cartItem.price * currencyRate,
			quantity: cartItem.quantity,
			currency: activeCurrency, //User may pay for goods later, so it will be convinient to fix actual currency rate
			currencyRate: currencyRate,
			totalPrice: Number(
				(cartItem.price * cartItem.quantity * currencyRate).toFixed(2)
			),
		}));

		const orderData: OrderData = {
			name: formData.name,
			surname: formData.surname,
			address: formData.address,
			phone: formData.phone,
			orderedGoods: {
				items: orderItems,
				total: orderItems.reduce((acc, item) => acc + item.totalPrice, 0),
			},
		};

		console.log(orderData);
	};

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
								<Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
									Check your goods
								</Typography>
								{cartItems.map((item) => (
									<CartItemBox key={item.id} item={item} />
								))}
							</Box>

							<ClientForm
								formData={formData}
								handleChange={handleInputChange}
								isFormValid={isFormValid}
							/>
						</>
					) : (
						<Typography>Your cart is empty.</Typography>
					)}
				</Box>
				<Box className="cart-modal-footer">
					<Button variant="contained" color="error" onClick={onClose}>
						<ArrowBackIcon />
						Back
					</Button>

					{cartItems.length > 0 && (
						<Box className="order-container">
							<Typography sx={{ fontWeight: "bold" }} variant="h6">
								Total: <CurrencySymbol />
								{cartItems
									.reduce(
										(acc, item) =>
											acc + item.price * item.quantity * currencyRate,
										0
									)
									.toFixed(2)}
							</Typography>

							<Button
								variant="contained"
								color="success"
								type="submit"
								form="client-form"
								disabled={!isFormValid}
								onClick={handleOrder}
							>
								Order <CheckCircleOutlineIcon />
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</Modal>
	);
};

export default CartModal;
