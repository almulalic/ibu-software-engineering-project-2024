import { axiosAuth } from "./Axios";
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
}
