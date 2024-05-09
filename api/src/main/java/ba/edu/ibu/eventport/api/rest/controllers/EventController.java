package ba.edu.ibu.eventport.api.rest.controllers;

import ba.edu.ibu.eventport.api.core.service.EventService;
import ba.edu.ibu.eventport.api.rest.configurations.versioning.ApiVersion;
import ba.edu.ibu.eventport.api.rest.models.auth.User;
import ba.edu.ibu.eventport.api.rest.models.dto.EventRequestDTO;
import ba.edu.ibu.eventport.api.rest.models.dto.EventTicket;
import ba.edu.ibu.eventport.api.rest.models.dto.EventViewDTO;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller handling API endpoints related to events.
 */
@RestController
@ApiVersion(1)
@RequestMapping("api/event")
public class EventController {

	private final EventService eventService;

	/**
	 * Constructor for EventController.
	 *
	 * @param eventService EventService instance.
	 */
	public EventController(final EventService eventService) {
		this.eventService = eventService;
	}

	/**
	 * Retrieve events based on various filters.
	 *
	 * @param searchText           Search text for filtering events.
	 * @param geoLocationCountries Optional list of country codes for filtering events by location.
	 * @param geoLocationCities    Optional list of city names for filtering events by location.
	 * @param categories           Optional list of category names for filtering events.
	 * @param startDate            Optional start date for filtering events by date range.
	 * @param endDate              Optional end date for filtering events by date range.
	 * @param pageable             Pageable information for pagination.
	 * @return ResponseEntity containing a Page of EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "")
	public ResponseEntity<Page<EventViewDTO>> getEvents(
		@RequestParam(required = false) String searchText,
		@RequestParam(required = false) Optional<List<String>> geoLocationCountries,
		@RequestParam(required = false) Optional<List<String>> geoLocationCities,
		@RequestParam(required = false) Optional<List<String>> categories,
		@RequestParam(required = false) Optional<String> startDate,
		@RequestParam(required = false) Optional<String> endDate,
		Pageable pageable
	) {
		return ResponseEntity.ok(
			eventService
				.getEvents(searchText, geoLocationCountries, geoLocationCities, categories, startDate, endDate, pageable)
				.map(EventViewDTO::new)
		);
	}

	/**
	 * Retrieves Top 10 events sorted by likedBy count descending.
	 *
	 * @return ResponseEntity containing a List of EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "focus")
	public ResponseEntity<List<EventViewDTO>> getEventsInFocus() {
		return ResponseEntity.ok(eventService.getEventsInFocus().stream().map(EventViewDTO::new).toList());
	}

	/**
	 * Retrieve events by category.
	 *
	 * @param category Category for filtering events.
	 * @return ResponseEntity containing a List of EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "category/{category}")
	public ResponseEntity<List<EventViewDTO>> getEventByCategory(@PathVariable String category) {
		return ResponseEntity.ok(eventService.getEventsByCategory(category));
	}

	/**
	 * Retrieve event by ID.
	 *
	 * @param id Event ID.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/{id}")
	public ResponseEntity<EventViewDTO> getEventById(@PathVariable String id) {
		return ResponseEntity.ok(eventService.getEventById(id));
	}

	/**
	 * Retrieve events liked by the user.
	 *
	 * @param request  HttpServletRequest for extracting user information.
	 * @param pageable Pageable information for pagination.
	 * @return ResponseEntity containing a List of EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/user/liked")
	public ResponseEntity<List<EventViewDTO>> getUserLikedEvents(HttpServletRequest request, Pageable pageable) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(
			eventService.getUserLikedEvents(user.getId(), pageable).stream().map(EventViewDTO::new).toList()
		);
	}

	/**
	 * Retrieve events created by the user.
	 *
	 * @param request  HttpServletRequest for extracting user information.
	 * @param pageable Pageable information for pagination.
	 * @return ResponseEntity containing a List of EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/user/created")
	public ResponseEntity<List<EventViewDTO>> getUserCreatedEvents(HttpServletRequest request, Pageable pageable) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(
			eventService.getUserCreatedEvents(user.getId(), pageable).stream().map(EventViewDTO::new).toList()
		);
	}

	/**
	 * Retrieve events the user is attending.
	 *
	 * @param request  HttpServletRequest for extracting user information.
	 * @param pageable Pageable information for pagination.
	 * @return ResponseEntity containing a List of EventTicket.
	 */
	@RequestMapping(method = RequestMethod.GET, path = "/user/attending")
	public ResponseEntity<List<EventTicket>> getUserAttendingEvents(HttpServletRequest request, Pageable pageable) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(eventService.getUserAttendingEvents(user.getId(), pageable));
	}

	/**
	 * Like an event.
	 *
	 * @param request HttpServletRequest for extracting user information.
	 * @param eventId Event ID to like.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/user/like/{eventId}")
	public ResponseEntity<EventViewDTO> like(HttpServletRequest request, @PathVariable String eventId) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(eventService.likeEvent(user.getId(), eventId));
	}

	/**
	 * Unlike an event.
	 *
	 * @param request HttpServletRequest for extracting user information.
	 * @param eventId Event ID to unlike.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/user/unlike/{eventId}")
	public ResponseEntity<EventViewDTO> unlike(HttpServletRequest request, @PathVariable String eventId) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(eventService.unlikeEvent(user.getId(), eventId));
	}

	/**
	 * Buy a ticket for an event.
	 *
	 * @param request    HttpServletRequest for extracting user information.
	 * @param eventId    Event ID for which the ticket is being bought.
	 * @param ticketName Name of the ticket being bought.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@RequestMapping(method = RequestMethod.POST, path = "/{eventId}/ticket/{ticketName}/buy")
	public ResponseEntity<EventViewDTO> buyTicket(
		HttpServletRequest request,
		@PathVariable String eventId,
		@PathVariable String ticketName
	) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(eventService.buyTicket(user.getId(), eventId, ticketName));
	}

	/**
	 * Create a new event.
	 *
	 * @param request         HttpServletRequest for extracting user information.
	 * @param eventRequestDTO EventRequestDTO containing information for the new event.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@PreAuthorize("hasAuthority('ORGANIZER')")
	@RequestMapping(method = RequestMethod.POST, path = "")
	public ResponseEntity<EventViewDTO> createEvent(
		HttpServletRequest request,
		@RequestBody EventRequestDTO eventRequestDTO
	) {
		User user = ((User) request.getAttribute("user"));
		return ResponseEntity.ok(eventService.addEvent(eventRequestDTO, user.getId()));
	}

	/**
	 * Update an existing event.
	 *
	 * @param id    Event ID to be updated.
	 * @param event Updated information in the form of EventRequestDTO.
	 * @return ResponseEntity containing an EventViewDTO.
	 */
	@PreAuthorize("hasAuthority('ORGANIZER')")
	@RequestMapping(method = RequestMethod.PUT, path = "/{id}")
	public ResponseEntity<EventViewDTO> updateEvent(@PathVariable String id, @RequestBody EventRequestDTO event) {
		return ResponseEntity.ok(eventService.updateEvent(id, event));
	}

	/**
	 * Delete an event.
	 *
	 * @param request HttpServletRequest for extracting user information.
	 * @param id      Event ID to be deleted.
	 * @return ResponseEntity with HttpStatus.NO_CONTENT.
	 */
	@PreAuthorize("hasAuthority('ORGANIZER')")
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public ResponseEntity<Void> deleteEvent(HttpServletRequest request, @PathVariable String id) {
		eventService.deleteEvent(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
