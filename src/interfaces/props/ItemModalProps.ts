import { Item } from "../items";

export interface ItemModalProps {
    item: Item;
    onClose: () => void;
    open: boolean;
}
