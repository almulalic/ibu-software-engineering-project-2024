import { Event } from "./Event";
import { TicketType } from "../ticket/TicketType";

export interface EventTicket {
	event: Event;
	ticketType: TicketType;
}
