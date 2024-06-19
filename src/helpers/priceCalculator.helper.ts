import { CartItem } from "../interfaces/items";

class PriceCalculator {
	private totalPrice = 0;
	getItemTotal({
		price,
		quantity = 1,
		currencyRate,
	}: {
		price: number;
		quantity: number;
		currencyRate: number;
	}): number {
		return Number((price * quantity * currencyRate).toFixed(2));
	}
	getCartTotal(cartItems: CartItem[], currencyRate: number) {
		this.totalPrice = Number(
			cartItems
				.reduce(
					(acc, item) => acc + item.price * item.quantity * currencyRate,
					0
				)
				.toFixed(2)
		);

		return this.totalPrice;
	}
}
const priceCalculator = new PriceCalculator();
export default priceCalculator;
