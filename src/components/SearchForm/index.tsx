import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";

interface SearchFormProps {
	handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	handleSearchChange: (event: React.ChangeEvent<{}>, value: string) => void;
	searchOptions: string[];
}

export const SearchForm = ({
	handleSearchSubmit,
	handleSearchChange,
	searchOptions,
}: SearchFormProps) => {
	return (
		<div className="search-form_container">
			<form onSubmit={handleSearchSubmit}>
				<Autocomplete
					options={searchOptions}
					sx={{ width: 300 }}
					onInputChange={handleSearchChange}
					renderInput={(params) => (
						<TextField {...params} label="Search" variant="outlined" />
					)}
				/>
				<Button type="submit" variant="contained">
					Search <SearchIcon />
				</Button>
			</form>
		</div>
	);
};