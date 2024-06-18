import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import { ClientFormProps } from "../../interfaces/props/ClientFormProps";
import "./styles.css";

export const ClientForm = ({
	formData,
	handleChange,
	isFormValid,
}: ClientFormProps) => {
	const { name, surname, address, phone } = formData;

	return (
		<Box
			className={`client-form-container ${isFormValid ? "" : "invalid-form"}`}
		>
			<Typography
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					color: isFormValid ? "black" : "red",
				}}
			>
				Fill in your details
			</Typography>
			<form className="client-form">
				<TextField
					name="name"
					label="Name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={name}
					required
					onChange={handleChange}
				/>
				<TextField
					name="surname"
					label="Surname"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={surname}
					onChange={handleChange}
				/>
				<TextField
					name="address"
					label="Address"
					variant="outlined"
					fullWidth
					required
					margin="normal"
					value={address}
					onChange={handleChange}
				/>
				<TextField
					name="phone"
					label="Phone"
					variant="outlined"
					error={phone.length !== 12}
					fullWidth
					required
					margin="normal"
					value={phone}
					onChange={handleChange}
					helperText={"Phone number must contain 12 digits"}
					InputProps={{
						startAdornment: <span>+</span>,
					}}
				/>
			</form>
		</Box>
	);
};
