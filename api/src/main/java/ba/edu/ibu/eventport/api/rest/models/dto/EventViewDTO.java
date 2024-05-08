package ba.edu.ibu.eventport.api.rest.models.dto;

import ba.edu.ibu.eventport.api.core.model.event.Event;
import ba.edu.ibu.eventport.api.core.model.event.GeoLocation;
import ba.edu.ibu.eventport.api.core.model.event.Participant;
import ba.edu.ibu.eventport.api.core.model.event.TicketType;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventViewDTO {

	private String id;
	private String name;
	private String description;
	private List<String> categories;
	private String bannerImageURL;
	private LocalDateTime dateTime;
	private GeoLocation geoLocation;
	private int capacity;
	private String venue;
	private String googleMapsURL;
	private List<TicketType> ticketTypes;

	private String createdBy;
	private List<Participant> participants;

	public EventViewDTO(Event event) {
		this.id = event.getId().toString();
		this.name = event.getName();
		this.description = event.getDescription();
		this.categories = event.getCategories();
		this.bannerImageURL = event.getBannerImageURL();
		this.dateTime = event.getDateTime();
		this.geoLocation = event.getGeoLocation();
		this.capacity = event.getCapacity();
		this.venue = event.getVenue();
		this.googleMapsURL = event.getGoogleMapsURL();
		this.ticketTypes = event.getTicketTypes();
		this.createdBy = event.getCreatedBy().toString();
		this.participants = event.getParticipants();
	}
}
