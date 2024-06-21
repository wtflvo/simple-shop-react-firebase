import { CartItem } from "../interfaces/items";

class SessionStorageHelper {
	loadCart = () => {
		const serializedState = sessionStorage.getItem("cart");
		if (!serializedState) {
			return [];
		}
		const cartData: CartItem[] = JSON.parse(serializedState);
		return cartData;
	};

	saveCart = (state: CartItem[]) => {
		const serializedState = JSON.stringify(state);
		sessionStorage.setItem("cart", serializedState);
	};
}
const sessionStorageHelper = new SessionStorageHelper();
export default sessionStorageHelper;
