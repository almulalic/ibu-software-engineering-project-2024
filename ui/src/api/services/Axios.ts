import axios, { Axios } from "axios";
import { AuthAPIService } from "../../api/services";
import { ACCESS_TOKEN_NAME, BASE_API_URL, BASE_AUTH_URL, REFRESH_TOKEN_NAME } from "../../constants";

export const publicAxiosApp = axios.create({
	baseURL: BASE_API_URL,
	timeout: 10000,
	validateStatus: () => true,
});

export const authorizedAxiosApp = axios.create({
	baseURL: BASE_API_URL,
	timeout: 10000,
	validateStatus: (status) => status !== 401 && status !== 403,
});
attachTokenLogic(authorizedAxiosApp);
attachRefreshLogic(authorizedAxiosApp);

export const axiosAuth = axios.create({
	baseURL: BASE_AUTH_URL,
	timeout: 10000,
	validateStatus: () => true,
});

export const axiosAuthAuthorized = axios.create({
	baseURL: BASE_AUTH_URL,
	timeout: 10000,
	validateStatus: (status) => status !== 401 && status !== 403,
});

attachTokenLogic(axiosAuthAuthorized);
attachRefreshLogic(axiosAuthAuthorized);

export const authorizedAuthAxiosApp = axios.create({
	baseURL: BASE_AUTH_URL,
	timeout: 10000,
	validateStatus: (status) => status !== 401 && status !== 403,
});
attachTokenLogic(authorizedAuthAxiosApp);
attachRefreshLogic(authorizedAuthAxiosApp);

function attachTokenLogic(app: Axios) {
	app.interceptors.request.use(async (config) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

		if (accessToken) {
			const token = `Bearer ${accessToken}`;
			config.headers!.Authorization = token;
		}

		return config;
	});
}

function attachRefreshLogic(app: Axios) {
	app.interceptors.response.use(
		(response) => {
			return response;
		},
		async function (error) {
			const originalRequest = error.config;

			if (error.response.status === 401 && !originalRequest._retry) {
				if (error.response.data === "JWT Expired!") {
					originalRequest._retry = true;

					let accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_NAME);
					let refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_NAME);

					if (accessToken && refreshToken) {
						let refreshResponse = await AuthAPIService.refreshToken(accessToken, refreshToken);

						if (refreshResponse.status === 200) {
							originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.accessToken}`;
							localStorage.setItem(ACCESS_TOKEN_NAME, refreshResponse.data.accessToken);

							return axios(originalRequest);
						} else {
							localStorage.clear();
							window.location.reload();
						}
					}
				} else if (error.response.data.includes("Refresh token was expired")) {
				}
			}

			return Promise.reject(error);
		}
	);
}
