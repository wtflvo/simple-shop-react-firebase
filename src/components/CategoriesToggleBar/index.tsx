import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Category } from "../../interfaces/enums/Category";
import "./styles.css";
import { CategoriesToggleBarProps } from "../../interfaces/props/CategoriesToggleBarProps";

export const CategoriesToggleBar = ({
	category,
	changeCategory,
}: CategoriesToggleBarProps) => {
	return (
		<aside className="categories_container">
			<h3>Categories:</h3>
			<ToggleButtonGroup
				value={category}
				exclusive
				onChange={(event, newCategory) => {
					if (newCategory !== null) {
						changeCategory(event, newCategory as Category);
					}
				}}
				aria-label="category"
				orientation="vertical"
				sx={{
					width: "100%",
					"& .MuiToggleButton-root": {
						color: "black",

						borderColor: "black",
						"&.Mui-selected": {
							color: "white",
							backgroundColor: "black",
						},
						"&:hover": {
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							color: "white",
						},
					},
				}}
			>
				{Object.values(Category).map((cat) => (
					<ToggleButton key={cat} value={cat}>
						{cat}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</aside>
	);
};
