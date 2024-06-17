import { AxiosResponse } from "axios";
import { axiosEventApp } from "./Axios";

export class MetadatService {
	static async getCountires(): Promise<AxiosResponse> {
		return axiosEventApp.get(`/metadata/country`);
	}

	static async getCategories(): Promise<AxiosResponse> {
		return axiosEventApp.get(`/metadata/category`);
	}
}
