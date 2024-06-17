export interface SearchFormProps {
	handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	handleSearchChange: (event: React.ChangeEvent<{}>, value: string) => void;
	searchOptions: string[];
}