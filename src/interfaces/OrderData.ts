import { OrderItem } from "./items";

export interface OrderData {
	name: string;
	surname: string;
	address: string;
	phone: string;
	orderedGoods: { items: OrderItem[]; total: number };
}
