interface BaseItem {
	id: string;
	title: string;
	price: number;
}

export interface Item extends BaseItem {
	description: string;
	category: string;
	image: string;
	rate: number;
}


export interface CartItem extends BaseItem {
	image: string;
	quantity: number;
}

export interface OrderItem extends BaseItem {
	quantity: number;
	totalPrice: number;
}
