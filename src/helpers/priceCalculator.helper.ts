import { CartItem } from "../interfaces/items";

class PriceCalculator {
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
}
const priceCalculator = new PriceCalculator();
export default priceCalculator;
