import React from "react";
import { Logo } from "../Logo";
import "./styles.css";

export const Footer = () => {
	return (
		<footer>
			<div className="footer_logo-container">
				<Logo size={26} />
			</div>

			<p>Made by Loot Cave</p>
		</footer>
	);
};
