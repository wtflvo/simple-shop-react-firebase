import { CurrenciesValue } from "../interfaces/CurrenciesValue";
import { CurrencyResponse } from "../interfaces/CurrencyResponse";
import http from "./http";

class CurrencyApiHelper {
	async fetchCurrency(): Promise<CurrencyResponse[]> {
		const apiUrl =
			"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
		const result: CurrencyResponse[] = await http.load(apiUrl);
		return result;
	}

	async getCurrenciesValue(): Promise<CurrenciesValue> {
		const currencies: CurrenciesValue = {
			uah: 0,
			usd: 1,
			eur: 0,
		};
		try {
			const currenciesApi: CurrencyResponse[] = await this.fetchCurrency();

			const usdCurrency: CurrencyResponse = currenciesApi.find(
				(currency) => currency.cc === "USD"
			)!;
			const eurCurrency: CurrencyResponse = currenciesApi.find(
				(currency) => currency.cc === "EUR"
			)!;

			if (usdCurrency) {
				Number(usdCurrency.rate.toFixed(2));
				currencies.uah = Number(usdCurrency.rate.toFixed(2));
			}

			if (eurCurrency) {
				currencies.eur = currencies.uah / Number(eurCurrency.rate.toFixed(2));
			}

			return currencies;
		} catch (error) {
			throw error;
		}
	}
}

const currenciesApiHelper = new CurrencyApiHelper();
export default currenciesApiHelper;
