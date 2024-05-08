package ba.edu.ibu.eventport.api.core.model.event;

import java.time.LocalDateTime;
import java.util.List;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Entity class representing an event.
 * <p>
 * This class is annotated with Lombok annotations for automatic generation of boilerplate code,
 * and it is intended to be used with MongoDB as indicated by the {@link Document} annotation.
 *
 * @see Document
 * @see GeoLocation
 * @see TicketType
 * @see Participant
 */
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class Event {

	/**
	 * The unique identifier for the event.
	 */
	@Id
	private ObjectId id;

	/**
	 * The name of the event.
	 */
	private String name;

	/**
	 * The categories associated with the event.
	 */
	private List<String> categories;

	/**
	 * The URL of the banner image for the event.
	 */
	private String bannerImageURL;

	/**
	 * A description of the event.
	 */
	private String description;

	/**
	 * The date and time of the event.
	 */
	private LocalDateTime dateTime;

	/**
	 * The geographical location of the event.
	 */
	private GeoLocation geoLocation;

	/**
	 * The venue where the event takes place.
	 */
	private String venue;

	/**
	 * The Google Maps URL associated with the event's location.
	 */
	private String googleMapsURL;

	/**
	 * The maximum capacity of attendees for the event.
	 */
	private int capacity;

	/**
	 * The types of tickets available for the event.
	 */
	private List<TicketType> ticketTypes;

	/**
	 * The unique identifier of the user who created the event.
	 */
	private ObjectId createdBy;

	/**
	 * The list of participants attending the event.
	 */
	private List<Participant> participants = List.of();
}
