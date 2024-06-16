import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Category } from "../../interfaces/enums/Filter";
import "./styles.css";

interface CategoriesToggleBarProps {
	category: Category;
	changeCategory: (
		event: React.MouseEvent<HTMLElement>,
		newCategory: Category
	) => void;
}

export const CategoriesToggleBar = ({
	category,
	changeCategory,
}: CategoriesToggleBarProps) => {
	return (
		<aside>
			<h3>Categories:</h3>
			<ToggleButtonGroup
				value={category}
				exclusive
				onChange={(event, newCategory) =>
					changeCategory(event, newCategory as Category)
				}
				aria-label="category"
				orientation="vertical"
				sx={{
					"& .MuiToggleButton-root": {
						color: "black",
						borderColor: "black",
						"&.Mui-selected": {
							color: "white",
							backgroundColor: "black",
						},
						"&:hover": {
							backgroundColor: "rgba(0, 0, 0, 0.5)",
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
