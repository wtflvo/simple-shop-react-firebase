import React from "react";

import { Logo } from "../Logo";
import "./styles.css";
import { CartIcon } from "../CartIcon";
import { CurrencySelector } from "../CurrencySelecor";

const NavBar = ({
	handleCartModalOpen,
}: {
	handleCartModalOpen: () => void;
}) => {
	return (
		<nav role="navigation" className="navbar">
			<div className="logo-container">
				<a href="/">
					{" "}
					<Logo />
				</a>
			</div>
			<div className="header-container">
				<h1>Shop</h1>
			</div>
			<div className="nav-actions">
				<CurrencySelector />
				<div className="cart-icon-container" onClick={handleCartModalOpen}>
					<CartIcon />
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
