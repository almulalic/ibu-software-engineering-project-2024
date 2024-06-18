import { AxiosResponse } from "axios";
import { createSearchParams } from "react-router-dom";
import { axiosAuthorizedEventApp, axiosEventApp } from "./Axios";
import { EventRequestDTO } from "../models/event/EventRequestDTO";

export class EventApiService {
	static async getAll(
		searchText: string,
		geolocationCountriesURI: string,
		geolocationCitiesURI: string,
		categoriesURI: string,
		startDate: string,
		endDate: string,
		currentPage: number,
		pageSize: number,
		sort: string
	): Promise<AxiosResponse> {
		return axiosEventApp.get(
			`/event?${createSearchParams({
				searchText: searchText,
				geoLocationCountries: geolocationCountriesURI,
				geoLocationCities: geolocationCitiesURI,
				categories: !categoriesURI || categoriesURI === "null" ? "" : categoriesURI,
				startDate: startDate,
				endDate: endDate,
				page: currentPage.toString(),
				size: pageSize.toString(),
				sort: sort,
			})}`
		);
	}

	static async getInFocus() {
		return axiosEventApp.get(`/event/focus`);
	}

	static async create(event: EventRequestDTO) {
		return axiosAuthorizedEventApp.post(`/event`, event);
	}

	static async edit(id: string, event: EventRequestDTO) {
		return axiosAuthorizedEventApp.put(`/event/${id}`, event);
	}

	static async like(eventId: string): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.post(`/event/user/like/${eventId}`);
	}

	static async unlike(eventId: string): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.post(`/event/user/unlike/${eventId}`);
	}

	static async likedEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.get(
			`/event/user/liked?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async createdEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.get(
			`/event/user/created?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async attendingEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.get(
			`/event/user/attending?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async buyTicket(eventId: string, ticketName: string): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.post(`/event/${eventId}/ticket/${ticketName}/buy`);
	}

	static async delete(eventId: string): Promise<AxiosResponse> {
		return axiosAuthorizedEventApp.delete(`/event/${eventId}`);
	}
}
