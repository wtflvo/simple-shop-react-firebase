import { Category } from "../enums/Category";

export interface CategoriesToggleBarProps {
	category: Category;
	changeCategory: (
		event: React.MouseEvent<HTMLElement>,
		newCategory: Category
	) => void;
}
