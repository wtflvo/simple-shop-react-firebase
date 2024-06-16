import React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
} from "@mui/material";
import { Item } from "../../interfaces/Item";
import "./styles.css";

export const ItemCard = ({ item }: { item: Item }) => {
	return (
		<Card className="card">
			<CardHeader
				title={item.title}
				subheader={`Category: ${item.category}`}
				sx={{ padding: 0 }}
				titleTypographyProps={{
					sx: { backgroundColor: "black", color: "white", padding: "1rem" },
				}}
				subheaderTypographyProps={{
					sx: { backgroundColor: "grey", color: "white", padding: ".5rem" },
				}}
			/>
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
