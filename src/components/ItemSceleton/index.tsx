import React from "react";
import { Skeleton } from "@mui/material";

export const ItemSceleton = () => {
	return (
		<div className="card">
			<Skeleton
				variant="text"
				sx={{ bgcolor: "black.500" }}
				width={350}
				height={60}
			/>
			<Skeleton
				variant="text"
				sx={{ bgcolor: "grey.900" }}
				width={350}
				height={40}
			/>
			<Skeleton
				variant="rectangular"
				sx={{ bgcolor: "grey.900" }}
				width={350}
				height={120}
			/>
			<Skeleton
				variant="rectangular"
				sx={{ bgcolor: "grey.900" }}
				width={350}
				height={80}
			/>
		</div>
	);
};
