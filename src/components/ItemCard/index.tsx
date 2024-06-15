import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Divider } from "@mui/material";
import { Item } from "../../interfaces/Item";

export const ItemCard = ({ item }: { item: Item }) => {
	return (
		<Card className="child">
			<CardHeader title={item.title} subheader={`Category: ${item.category}`} />
			<CardContent>
				<div className="row card-content">
					<div className="img-content">
						<img
							src={item.image}
							alt="item"
							className="item-image col-12 col-sm-12 col-md-6 col-lg-6"
						/>
						<div className="col-12 col-sm-12 col-md-6 col-lg-6">
							<p>Price: {item.price}$</p>
							<p>Item rating: {item.rate}</p>
						</div>
					</div>
					<div className="description-box">
						<p className="text-short">{item.description}</p>
					</div>
				</div>
			</CardContent>
			<Divider />
			<CardActions></CardActions>
		</Card>
	);
};
