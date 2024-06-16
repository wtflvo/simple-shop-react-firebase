import React from "react";

import { Logo } from "../Logo";
import "./styles.css";


const NavBar: React.FC = () => {
	return (
		<nav role="navigation" className="navbar">
			<div className="logo-container">
				<Logo />
			</div>
			<div className="header-container">
				<h1>Shop</h1>
			</div>
		</nav>
	);
};

export default NavBar;
