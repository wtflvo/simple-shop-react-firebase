import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFormProps } from "../../interfaces/props/SearchFormProps";
import "./styles.css";

export const SearchForm = ({
	handleSearchSubmit,
	handleSearchChange,
	searchOptions,
}: SearchFormProps) => {
	return (
		<div className="search-form_container">
			<form onSubmit={handleSearchSubmit}>
				<Autocomplete
					freeSolo
					options={searchOptions}
					sx={{ width: 300 }}
					onInputChange={(event, value) => handleSearchChange(event, value)}
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
