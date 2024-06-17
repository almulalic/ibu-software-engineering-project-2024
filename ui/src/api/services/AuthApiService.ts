import { createSearchParams } from "react-router-dom";
import { axiosAuthApp, axiosAuthorizedAuthApp } from "./Axios";
import { AxiosResponse } from "axios";

export class AuthAPIService {
	static async login(email: string, password: string, rememberMe: boolean): Promise<AxiosResponse> {
		return axiosAuthApp.post("/auth/token/generate", { email: email, password: password, rememberMe: rememberMe });
	}

	static async refreshToken(accessToken: string, refreshToken: string): Promise<AxiosResponse> {
		return axiosAuthApp.post("/auth/token/refresh", { accessToken: accessToken, refreshToken: refreshToken });
	}

	static async signup(
		firstName: string,
		lastName: string,
		displayName: string,
		email: string,
		password: string
	): Promise<AxiosResponse> {
		return axiosAuthApp.post("/auth/signup", {
			firstName: firstName,
			lastName: lastName,
			email: email,
			displayName: displayName,
			password: password,
		});
	}

	static async getUsers(searchText: string): Promise<AxiosResponse> {
		return axiosAuthorizedAuthApp.get(
			`/auth/user/search?${createSearchParams({
				searchText: searchText,
			})}`
		);
	}

	static async changeRoles(userId: string, roles: string[]): Promise<AxiosResponse> {
		return axiosAuthorizedAuthApp.put(`/auth/user/edit/role`, {
			userId: userId,
			roles: roles,
		});
	}

	static async edit(firstName: string, lastName: string, displayName: string, email: string): Promise<AxiosResponse> {
		return axiosAuthorizedAuthApp.put("/auth/user", {
			firstName: firstName,
			lastName: lastName,
			email: email,
			displayName: displayName,
		});
	}
}
