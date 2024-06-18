import { FormData } from "../FormData";

export interface ClientFormProps {
	formData: FormData;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isFormValid: boolean;
}
