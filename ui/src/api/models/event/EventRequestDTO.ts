import dayjs from "dayjs";
import { TicketType } from "../ticket/TicketType";

export class EventRequestDTO {
	name: string;
	categories: string[];
	bannerImageURL: string;
	description: string;
	dateTime?: string;
	countryIso2Code: string;
	city: string;
	venue: string;
	googleMapsURL: string;
	capacity: number;
	ticketTypes: TicketType[];

	constructor() {
		this.name = "";
		this.categories = [];
		this.description = "";
		this.bannerImageURL = "";
		this.dateTime = undefined;
		this.countryIso2Code = "";
		this.city = "";
		this.venue = "";
		this.googleMapsURL = "";
		this.capacity = 0;
		this.ticketTypes = [];
	}

	fromForm(formValues: any) {
		let eventRequestDTO = new EventRequestDTO();

		eventRequestDTO.name = formValues.name;
		eventRequestDTO.categories = formValues.categories.map((x: any) => x[0]);
		eventRequestDTO.bannerImageURL = formValues.bannerImageURL;
		eventRequestDTO.description = formValues.description;
		eventRequestDTO.dateTime = (formValues.dateTime as dayjs.Dayjs).toISOString();
		eventRequestDTO.countryIso2Code = formValues.geoLocation[0];
		eventRequestDTO.city = formValues.geoLocation[1];
		eventRequestDTO.venue = formValues.venue;
		eventRequestDTO.googleMapsURL = formValues.googleMapsURL;
		eventRequestDTO.capacity = formValues.capacity;
		eventRequestDTO.ticketTypes = formValues.ticketTypes;

		return eventRequestDTO;
	}
}
