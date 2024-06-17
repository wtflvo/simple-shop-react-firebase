import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Logo } from "../Logo";
import "./styles.css";

const NavBar: React.FC = ({
	handleCartModalOpen,
}: {
	handleCartModalOpen: () => void;
}) => {
	return (
		<nav role="navigation" className="navbar">
			<div className="logo-container">
				<Logo />
			</div>
			<div className="header-container">
				<h1>Shop</h1>
			</div>

			<div className="cart-container" onClick={handleCartModalOpen}>
				<ShoppingCartIcon />
			</div>
		</nav>
	);
};

export default NavBar;
