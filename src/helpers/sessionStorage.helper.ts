import { CartItem } from "../interfaces/items";

class SessionStorageHelper {
	loadCart = () => {
		try {
			const serializedState = sessionStorage.getItem("cart");
			if (!serializedState) {
				return [];
			}
			const cartData: CartItem[] = JSON.parse(serializedState);
			return cartData;
		} catch (err) {
			console.error("Session storage error:", err);
		}
	};

	saveCart = (state: CartItem[]) => {
		try {
			const serializedState = JSON.stringify(state);
			sessionStorage.setItem("cart", serializedState);
		} catch (err) {
			console.error("Session storage error:", err);
		}
	};
}
const sessionStorageHelper = new SessionStorageHelper();
export default sessionStorageHelper;
