import { CartItem, OrderItem } from "../interfaces/items";
import { OrderData } from "../interfaces/OrderData";
import { FillOrderDataProps } from "../interfaces/props/FillOrderDataProps";


class OrderHelper {
	getItemTotal({
		price,
		quantity = 1,
		currencyRate,
	}: {
		price: number;
		quantity: number;
		currencyRate: number;
	}): string {
		return (price * quantity * currencyRate).toFixed(2);
	}
	getCartTotal(cartItems: CartItem[], currencyRate: number) {
		return cartItems
			.reduce((acc, item) => acc + item.price * item.quantity * currencyRate, 0)
			.toFixed(2);
	}
	fillOrderData({
		cartItems,
		formData,
		currencyRate,
		activeCurrency,
	}: FillOrderDataProps) {
		const orderItems: OrderItem[] = cartItems.map((cartItem: CartItem) => ({
			id: cartItem.id,
			title: cartItem.title,
			price: cartItem.price * currencyRate,
			quantity: cartItem.quantity,
			currency: activeCurrency, //User may pay for goods later, so it will be convinient to fix actual currency rate
			currencyRate: currencyRate,
			totalPrice: Number(
				this.getItemTotal({
					price: cartItem.price,
					quantity: cartItem.quantity,
					currencyRate,
				})
			),
		}));

		const orderData: OrderData = {
			name: formData.name,
			surname: formData.surname,
			address: formData.address,
			phone: formData.phone,
			orderedGoods: {
				items: orderItems,
				total: Number(this.getCartTotal(cartItems, currencyRate)),
			},
		};
		return orderData;
	}
}
const orderHelper = new OrderHelper();
export default orderHelper;
