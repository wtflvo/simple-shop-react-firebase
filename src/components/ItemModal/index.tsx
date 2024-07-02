import React from "react";
import { Box, Modal } from "@mui/material";
import { FullItemCard } from "../FullItemCard";
import { ItemModalProps } from "../../interfaces/props/ItemModalProps";
import "./styles.css";

export const ItemModal = ({ item, onClose, open }: ItemModalProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box className="item-modal">
				<FullItemCard item={item} closeModal={onClose} />
			</Box>
		</Modal>
	);
};
