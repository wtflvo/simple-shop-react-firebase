import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";

import "./styles.css";

export const Rating = ({ rate }: { rate: number }) => {
	return (
		<div className="rating-wrapper">
			<p>Product rating: {rate}/5</p>
			{[...Array(5)].map((_, index) => {
				const rateValue = index + 1;
				if (rateValue <= rate) {
					return <StarIcon key={index} />;
				} else if (rateValue === Math.ceil(rate) && rate % 1 !== 0) {
					return <StarHalfIcon key={index} />;
				}
				return <StarBorderIcon key={index} />;
			})}
		</div>
	);
};
