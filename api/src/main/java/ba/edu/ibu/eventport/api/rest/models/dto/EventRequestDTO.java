package ba.edu.ibu.eventport.api.rest.models.dto;

import ba.edu.ibu.eventport.api.core.model.event.Event;
import ba.edu.ibu.eventport.api.core.model.event.GeoLocation;
import ba.edu.ibu.eventport.api.core.model.event.TicketType;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * Data Transfer Object (DTO) representing the details required for creating or updating an event.
 * <p>
 * This class includes validation annotations, a builder pattern, and a conversion method to convert the DTO to an Event entity.
 *
 * @see Event
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class EventRequestDTO {

	/**
	 * The name of the event.
	 */
	private String id;

	/**
	 * The name of the event.
	 */
	@NotEmpty
	private String name;

	/**
	 * The categories associated with the event.
	 */
	@NotEmpty
	private List<String> categories;

	/**
	 * The URL of the banner image for the event.
	 */
	@NotEmpty
	private String bannerImageURL;

	/**
	 * A description of the event.
	 */
	@NotEmpty
	private String description;

	/**
	 * The date and time of the event, expected to be in the future.
	 */
	@NotEmpty
	@Future
	private LocalDateTime dateTime;

	/**
	 * The ISO 2 code of the country where the event takes place.
	 */
	@NotEmpty
	private String countryIso2Code;

	/**
	 * The city where the event takes place.
	 */
	@NotEmpty
	private String city;

	/**
	 * The maximum capacity of attendees for the event.
	 */
	@NotEmpty
	@Positive
	private int capacity;

	/**
	 * The venue where the event takes place.
	 */
	@NotEmpty
	private String venue;

	/**
	 * The Google Maps URL associated with the event's location.
	 */
	@NotEmpty
	private String googleMapsURL;

	/**
	 * A list of email addresses for notification purposes.
	 */
	@Email.List({ @Email(message = "Invalid email address") })
	private List<Integer> notificationList = new ArrayList<>();

	/**
	 * The types of tickets available for the event.
	 */
	@NotEmpty
	private List<TicketType> ticketTypes;

	/**
	 * Converts the DTO to an {@link Event} entity.
	 *
	 * @return An {@link Event} entity representing the event details.
	 * @see Event
	 */
	public Event toEntity() {
		return Event
			.Builder()
			.withName(name)
			.withCategories(categories)
			.withBannerImageURL(bannerImageURL)
			.withDescription(description)
			.withDateTime(dateTime)
			.withGeoLocation(new GeoLocation(countryIso2Code, "", city))
			.withCapacity(capacity)
			.withVenue(venue)
			.withGoogleMapsURL(googleMapsURL)
			.withTicketTypes(ticketTypes)
			.withCreatedBy(new ObjectId())
			.withLikedBy(List.of())
			.withParticipants(List.of())
			.build();
	}
}
