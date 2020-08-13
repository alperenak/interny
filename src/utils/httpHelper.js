import axios from 'axios';

export default {

	makeGetRequest(url, baseUrl, tokenCookieName, errorMessageBuilder,headersOptions={}) {
		let token = "Token " + localStorage.getItem(tokenCookieName);
		const headers = {
			"Accept": "application/json",
			"Cache-Control": "no-cache",
			Authorization: token,
			...headersOptions
		};

		const instance = axios.create({
			baseURL: baseUrl,
			headers: headers,
			timeout: 60000
		});

		return instance.get(url).catch(error => {
			return this.getErrorResponse(
				error,
				errorMessageBuilder,
				() => this.makeGetRequest(url, baseUrl, tokenCookieName, errorMessageBuilder),
				tokenCookieName
			);
		});
	},

	makePostRequest(url, baseUrl, tokenCookieName, postBody, errorMessageBuilder, formData = false, onProgress = () => { }, onCancelTokenAdded = () => { }) {
		let token = "Token " + localStorage.getItem(tokenCookieName);
		let headers = {
			"Content-Type": "application/json",
			Authorization: token
		};
		if (formData) {
			headers['Content-Type'] = 'multipart/form-data';
		}
		let CancelToken = axios.CancelToken;

		let cancel = new CancelToken(function executor(c) {
			onCancelTokenAdded(c);
		});

		const instance = axios.create({
			baseURL: baseUrl,
			headers: headers,
			timeout: 60000,
			onUploadProgress: progressEvent => {
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				onProgress(percentCompleted)
			},
			cancelToken: cancel
		});

		if (formData) {
			return instance.post(url, postBody).catch(error => {
				return this.getErrorResponse(
					error,
					errorMessageBuilder,
					() => this.makePostRequest(url, baseUrl, tokenCookieName, postBody, errorMessageBuilder)
				);
			});
		}
		return instance.post(url, JSON.stringify(postBody)).catch(error => {
			return this.getErrorResponse(
				error,
				errorMessageBuilder,
				() => this.makePostRequest(url, baseUrl, tokenCookieName, postBody, errorMessageBuilder),
				tokenCookieName
			);
		});
	},

	makeDeleteRequest(url, baseUrl, tokenCookieName, errorMessageBuilder) {
		let token = "Token " + localStorage.getItem(tokenCookieName);
		const headers = {
			"Content-Type": "application/json",
			Authorization: token
		};

		const instance = axios.create({
			baseURL: baseUrl,
			headers: headers,
			timeout: 60000
		});

		return instance.delete(url).catch(error => {
			return this.getErrorResponse(
				error,
				errorMessageBuilder,
				() => this.makeDeleteRequest(url, baseUrl, tokenCookieName, errorMessageBuilder),
				tokenCookieName
			);
		});
	},

	makePutRequest(url, baseUrl, tokenCookieName, postBody, errorMessageBuilder, onProgress = () => {
	}, onCancelTokenAdded = () => {
	}) {
		let token = "Token " + localStorage.getItem(tokenCookieName);
		const headers = {
			"Content-Type": "application/json",
			Authorization: token
		};
		let CancelToken = axios.CancelToken;

		let cancel = new CancelToken(function executor(c) {
			onCancelTokenAdded(c);
		});
		const instance = axios.create({
			baseURL: baseUrl,
			headers: headers,
			timeout: 60000,
			onUploadProgress: progressEvent => {
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				onProgress(percentCompleted)
			},
			cancelToken: cancel
		});

		return instance.put(url, postBody).catch(error => {
			return this.getErrorResponse(
				error,
				errorMessageBuilder,
				() => this.makePutRequest(url, baseUrl, tokenCookieName, errorMessageBuilder),
				tokenCookieName
			);
		});
	},

	getErrorResponse(error, errorMessageBuilder, retryFunction, tokenCookieName) {
		let response = {errorData: {message: error.message}};

		if (error.response) {
			if (error.response.status == 401) {
				let event = new CustomEvent("GlobalEvent__RefreshToken", {detail:{tokenCookieName: tokenCookieName.split(":")[1]}}); // (2)
				window.dispatchEvent(event);
				return new Promise(function (resolve, reject) {
					window.addEventListener("GlobalEvent__TokenRefreshed", (e) => {
						retryFunction().then((response) => {
							resolve(response);
						}).catch((error) => {
							reject(error);
						});
					}, {once: true});
				});
			}
			response = error.response;
			response.errorData = error.response.data;
			if(!error.response.data.code && !error.config.url.includes("taxoffices")){
				let event = new CustomEvent("HTTP_ERROR", {detail:{code: "500"}}); // (2)
				// window.dispatchEvent(event);
			}
		}
		else if (error.request) {
			response = error.request;
			response.errorData = {};
			if(!error.config.url.includes("taxoffices")){
				let event = new CustomEvent("HTTP_ERROR", {detail:{code: "500"}}); // (2)
				// window.dispatchEvent(event);
			}
		}
		response.hasError = true;
		let errorMessage = errorMessageBuilder && errorMessageBuilder(response);
		response.errorData = {...response.errorData, ...errorMessage};
		return response;
	},

}
