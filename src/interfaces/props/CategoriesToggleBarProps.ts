import { Category } from "../enums/Filter";

export interface CategoriesToggleBarProps {
	category: Category;
	changeCategory: (
		event: React.MouseEvent<HTMLElement>,
		newCategory: Category
	) => void;
}
