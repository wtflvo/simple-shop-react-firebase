import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../state/store";
import { CartItem } from "../../interfaces/items";
import { CartItemBox } from "../CartItemBox";
import { CartModalProps } from "../../interfaces/props/CartModalProps";
import { ClientForm } from "../ClientForm";
import { OrderData } from "../../interfaces/OrderData";
import { FormData } from "../../interfaces/FormData";
import validationHelper from "../../helpers/validation.helper";
import { CurrencySymbol } from "../CurrencySymbol";
import orderHelper from "../../helpers/order.helper";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import uploadOrder from "../../db/export/uploadOrder";
import { toast } from "react-toastify";
import "./styles.css";

export const CartModal: React.FC<CartModalProps> = ({ open, onClose }) => {
	const { handleClearCart } = useCartHandlers();
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

	const handleOrder = async (event: React.FormEvent) => {
		event.preventDefault();

		const orderData: OrderData = orderHelper.fillOrderData({
			cartItems,
			formData,
			currencyRate,
			activeCurrency,
		});

		console.log(orderData, "Order Data");
		try {
			await uploadOrder(orderData);
			handleClearCart();
			onClose();
			toast.success("Your order has been successfully created!");
		} catch (error: any) {
			toast.error(("Error uploading order, error: " + error.message) as string);
		}
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
							<div className="cart-items-container">
								<Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
									Check your goods
								</Typography>
								{cartItems.map((item) => (
									<CartItemBox key={item.id} item={item} />
								))}
							</div>

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
					<Box className="abort-container">
						<Button variant="contained" color="error" onClick={onClose}>
							<ArrowBackIcon />
							Back
						</Button>
						{cartItems.length > 0 && (
							<Button
								variant="contained"
								color="warning"
								onClick={handleClearCart}
							>
								Clear Cart
							</Button>
						)}
					</Box>

					{cartItems.length > 0 && (
						<Box className="order-container">
							<Typography sx={{ fontWeight: "bold" }} variant="h6">
								Total: <CurrencySymbol />
								{orderHelper.getCartTotal(cartItems, currencyRate)}
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
