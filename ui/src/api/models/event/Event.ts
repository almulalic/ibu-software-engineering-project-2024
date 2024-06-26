import { TicketType } from "../ticket/TicketType";
import { GeoLocation } from "../GeoLocation";
import { Participant } from "./Participant";

export interface Event {
	id: string;
	name: string;
	categories: string[];
	bannerImageURL: string;
	description: string;
	dateTime: string;
	geoLocation: GeoLocation;
	capacity: number;
	venue: string;
	googleMapsURL: string;
	ticketTypes: TicketType[];

	createdBy: string;
	likedBy: string[];
	participants: Participant[];
}
