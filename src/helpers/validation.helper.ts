class ValidationHelper {
	checkPhone(inputValue: string): boolean {
		if (/[^0-9]/.test(inputValue)) {
			return false;
		}

		if (inputValue.length > 12) {
			return false;
		}

		return true;
	}
}
const validationHelper = new ValidationHelper();
export default validationHelper;
