import React from "react";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Tooltip,
} from "@mui/material";
import { Rating } from "../Rating";
import { Item } from "../../interfaces/Item";
import "./styles.css";

export const ItemCard = ({ item }: { item: Item }) => {
	return (
		<Card className="card col-sm-12 col-md-6 col-lg-6 col-12">
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
					<div className="img-and-description">
						<img
							src={item.image}
							alt="item"
							className="item-image col-12 col-sm-12 col-md-6 col-lg-6"
						/>
						<div className="description-wrapper col-12 col-sm-12 col-md-6 col-lg-6">
							<div className="description-content">
								<p className="text-short">{item.description}</p>
							</div>
							<Rating rate={item.rate} />
						</div>
					</div>
				</div>
			</CardContent>
			<Divider />
			<CardActions className="action-container">
				<p className="card-price">{item.price}$</p>
				<Button className="card-button">Add to cart</Button>
			</CardActions>
		</Card>
	);
};
