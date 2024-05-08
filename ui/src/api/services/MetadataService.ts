import { AxiosResponse } from "axios";
import { publicAxiosApp } from "./Axios";

export class MetadatService {
	static async getCountires(): Promise<AxiosResponse> {
		return publicAxiosApp.get(`/metadata/country`);
	}

	static async getCategories(): Promise<AxiosResponse> {
		return publicAxiosApp.get(`/metadata/category`);
	}
}
