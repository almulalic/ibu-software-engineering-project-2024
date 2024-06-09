import { AxiosResponse } from "axios";
import { createSearchParams } from "react-router-dom";
import { authorizedAxiosApp, publicAxiosApp } from "./Axios";
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
		return publicAxiosApp.get(
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
		return publicAxiosApp.get(`/event/focus`);
	}

	static async create(event: EventRequestDTO) {
		return authorizedAxiosApp.post(`/event`, event);
	}

	static async edit(id: string, event: EventRequestDTO) {
		return authorizedAxiosApp.put(`/event/${id}`, event);
	}

	static async like(eventId: string): Promise<AxiosResponse> {
		return authorizedAxiosApp.post(`/event/user/like/${eventId}`);
	}

	static async unlike(eventId: string): Promise<AxiosResponse> {
		return authorizedAxiosApp.post(`/event/user/unlike/${eventId}`);
	}

	static async likedEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return authorizedAxiosApp.get(
			`/event/user/liked?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async createdEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return authorizedAxiosApp.get(
			`/event/user/created?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async attendingEvents(currentPage: number, pageSize: number): Promise<AxiosResponse> {
		return authorizedAxiosApp.get(
			`/event/user/attending?${createSearchParams({
				page: currentPage.toString(),
				size: pageSize.toString(),
			})}`
		);
	}

	static async buyTicket(eventId: string, ticketName: string): Promise<AxiosResponse> {
		return authorizedAxiosApp.post(`/event/${eventId}/ticket/${ticketName}/buy`);
	}

	static async delete(eventId: string): Promise<AxiosResponse> {
		return authorizedAxiosApp.delete(`/event/${eventId}`);
	}
}
