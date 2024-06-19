class Http {
	async load(url: string): Promise<any> {
		return fetch(url)
			.then(this.checkStatus)
			.then(this.parseJSON)
			.catch(this.throwError);
	}

	async checkStatus(response: Response): Promise<any> {
		if (!response.ok) {
			const parsedException = await response.json().catch(() => ({
				message: response.statusText,
			}));

			throw new Error(parsedException?.message);
		}

		return response;
	}

	parseJSON(response: Response): Promise<any> {
		return response.json();
	}

	throwError(error: Error) {
		throw error;
	}
}

const http = new Http();
export default http;
