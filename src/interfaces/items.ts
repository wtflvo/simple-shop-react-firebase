export interface Item {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rate: number;
}

export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}
