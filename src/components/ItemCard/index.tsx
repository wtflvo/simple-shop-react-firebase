import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Skeleton,
} from "@mui/material";
import { Rating } from "../Rating";
import { Item } from "../../interfaces/items";
import { useCartHandlers } from "../../state/handlers/shop/cartHandlers";
import { RootState } from "../../state/store";
import { CurrencySymbol } from "../CurrencySymbol";
import "./styles.css";
import { Status } from "../../interfaces/enums/Status";

export const ItemCard = ({ item }: { item: Item }) => {
	const currencyRate = useSelector(
		(state: RootState) => state.currency.currenciesValue[state.currency.active]
	);
	const itemsStatus = useSelector((state: RootState) => state.shop.status);
	const [isLoading, setIsLoading] = React.useState(
		itemsStatus === Status.LOADING
	);

	useEffect(() => {
		setIsLoading(itemsStatus === Status.LOADING);
	}, [itemsStatus]);

	const { handleAddToCart } = useCartHandlers();

	return (
		<Card className="card col-sm-12 col-md-6 col-lg-6 col-12">
			{isLoading ? (
				<>
					<Skeleton
						variant="text"
						sx={{ bgcolor: "black.900" }}
						width={210}
						height={40}
					/>
					<Skeleton
						variant="text"
						sx={{ bgcolor: "grey.900" }}
						width={210}
						height={20}
					/>
					<Skeleton
						variant="rectangular"
						sx={{ bgcolor: "grey.900" }}
						width={210}
						height={80}
					/>
					<Skeleton
						variant="rectangular"
						sx={{ bgcolor: "grey.900" }}
						width={210}
						height={40}
					/>
				</>
			) : (
				<>
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
								<span className="card-img-wrapper">
									<img src={item.image} alt="item" className="item-image " />
								</span>
								<div className="description-wrapper">
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
						<p className="card-price">
							{(item.price * currencyRate).toFixed(2)}
							<CurrencySymbol />
						</p>
						<Button
							onClick={() => handleAddToCart(item)}
							className="card-button"
						>
							Add to cart
						</Button>
					</CardActions>
				</>
			)}
		</Card>
	);
};
