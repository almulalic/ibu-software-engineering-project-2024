import { createSearchParams } from "react-router-dom";
import { axiosAuth, axiosAuthAuthorized, authorizedAuthAxiosApp } from "./Axios";
import { AxiosResponse } from "axios";

export class AuthAPIService {
	static async login(email: string, password: string, rememberMe: boolean): Promise<AxiosResponse> {
		return axiosAuth.post("/auth/token/generate", { email: email, password: password, rememberMe: rememberMe });
	}

	static async refreshToken(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
		return axiosAuth.post("/auth/token/refresh", { accessToken: accessToken, refreshToken: refreshToken });
	}

	static async signup(
		firstName: string,
		lastName: string,
		displayName: string,
		email: string,
		password: string
	): Promise<AxiosResponse> {
		return axiosAuth.post("/auth/signup", {
			firstName: firstName,
			lastName: lastName,
			email: email,
			displayName: displayName,
			password: password,
		});
	}

	static async getUsers(searchText: string): Promise<AxiosResponse> {
		return axiosAuthAuthorized.get(
			`/auth/user/search?${createSearchParams({
				searchText: searchText,
			})}`
		);
	}

	static async changeRoles(userId: string, roles: string[]): Promise<AxiosResponse> {
		return axiosAuthAuthorized.put(`/auth/user/edit/role`, {
			userId: userId,
			roles: roles,
		});
	}

	static async edit(firstName: string, lastName: string, displayName: string, email: string): Promise<AxiosResponse> {
		return authorizedAuthAxiosApp.put("/auth/user", {
			firstName: firstName,
			lastName: lastName,
			email: email,
			displayName: displayName,
		});
	}
}
