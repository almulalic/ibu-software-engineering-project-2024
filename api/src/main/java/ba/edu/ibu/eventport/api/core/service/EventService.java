package ba.edu.ibu.eventport.api.core.service;

import ba.edu.ibu.eventport.api.core.model.Country;
import ba.edu.ibu.eventport.api.core.model.Ticket;
import ba.edu.ibu.eventport.api.core.model.event.Event;
import ba.edu.ibu.eventport.api.core.model.event.GeoLocation;
import ba.edu.ibu.eventport.api.core.model.event.Participant;
import ba.edu.ibu.eventport.api.core.model.event.TicketType;
import ba.edu.ibu.eventport.api.core.repository.*;
import ba.edu.ibu.eventport.api.core.repository.impl.FilterableEventRepositoryImpl;
import ba.edu.ibu.eventport.api.exception.general.BadRequestException;
import ba.edu.ibu.eventport.api.exception.repository.ResourceNotFoundException;
import ba.edu.ibu.eventport.api.rest.models.dto.EventRequestDTO;
import ba.edu.ibu.eventport.api.rest.models.dto.EventTicket;
import ba.edu.ibu.eventport.api.rest.models.dto.EventViewDTO;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class EventService {

  private final EventRepository eventRepository;
  private final FilterableEventRepositoryImpl filterableEventRepository;

  private final CountryRepository countryRepository;
  private final CategoryRepository categoryRepository;
  private final TicketRepository ticketRepository;

  /**
   * Retrieves a page of events based on specified parameters.
   *
   * @param optionalText         Optional text to filter events.
   * @param geoLocationCities    Optional list of cities for geolocation filtering.
   * @param geoLocationCountries Optional list of countries for geolocation filtering.
   * @param categories           Optional list of categories to filter events.
   * @param startDate            Optional start date for filtering events.
   * @param endDate              Optional end date for filtering events.
   * @param pageable             Pageable object for pagination and sorting.
   * @return A {@link Page} of {@link Event} objects based on the provided parameters.
   */
  public Page<Event> getEvents(
    String optionalText,
    Optional<List<String>> geoLocationCities,
    Optional<List<String>> geoLocationCountries,
    Optional<List<String>> categories,
    Optional<String> startDate,
    Optional<String> endDate,
    Pageable pageable
  ) {
    return filterableEventRepository.findAll(
      optionalText,
      geoLocationCities.orElse(List.of()),
      geoLocationCountries.orElse(List.of()),
      categories.orElse(List.of()),
      startDate.orElse(""),
      endDate.orElse(""),
      pageable
    );
  }

  /**
   * Retrieves Top 10 events sorted by likedBy count descending.
   *
   * @return An {@link List<EventViewDTO>} representing the details of the specified events.
   */
  public List<Event> getEventsInFocus() {
    return eventRepository.findTop10LikedDesc();
  }

  /**
   * Retrieves a list of events created by the specified user.
   *
   * @param userId   The ID of the user whose created events are to be retrieved.
   * @param pageable Pageable object for pagination and sorting.
   * @return A {@link List} of {@link Event} objects created by the specified user.
   */
  public List<Event> getUserCreatedEvents(
    String userId,
    Pageable pageable
  ) {
    return eventRepository.findUserCreatedEvents(new ObjectId(userId), pageable);
  }

  /**
   * Retrieves a list of events liked by the specified user.
   *
   * @param userId   The ID of the user whose liked events are to be retrieved.
   * @param pageable Pageable object for pagination and sorting.
   * @return A {@link List} of {@link Event} objects liked by the specified user.
   */
  public List<Event> getUserLikedEvents(
    String userId,
    Pageable pageable
  ) {
    return eventRepository.findUserLikedEvents(new ObjectId(userId), pageable);
  }

  /**
   * Retrieves a list of event tickets for events that the specified user is attending.
   *
   * @param userId   The ID of the user whose attending events are to be retrieved.
   * @param pageable Pageable object for pagination and sorting.
   * @return A {@link List} of {@link EventTicket} objects for events attended by the specified user.
   */
  public List<EventTicket> getUserAttendingEvents(
    String userId,
    Pageable pageable
  ) {
    return ticketRepository.findUserAttendingEvents(new ObjectId(userId), pageable);
  }

  /**
   * Retrieves an {@link EventViewDTO} for the event with the specified ID.
   *
   * @param id The ID of the event to retrieve.
   * @return An {@link EventViewDTO} representing the details of the specified event.
   * @throws ResourceNotFoundException If no event with the given ID is found.
   */
  public EventViewDTO getEventById(String id) {
    Optional<Event> event = eventRepository.findById(id);

    if (event.isEmpty()) {
      throw new ResourceNotFoundException("The event with the given ID does not exist.");
    }

    return new EventViewDTO(event.get());
  }

  /**
   * Retrieves a list of {@link EventViewDTO}s for events belonging to the specified category.
   *
   * @param category The category for which events are to be retrieved.
   * @return A {@link List} of {@link EventViewDTO}s representing events in the specified category.
   * @throws ResourceNotFoundException If no events with the given category are found.
   */
  public List<EventViewDTO> getEventsByCategory(String category) {
    List<Event> events = eventRepository.findByCategory(category);

    if (events.size() == 0) {
      throw new ResourceNotFoundException("No events with the given category exist.");
    }

    return events.stream().map(EventViewDTO::new).collect(Collectors.toList());
  }

  /**
   * Likes an event on behalf of a user and returns the updated {@link EventViewDTO}.
   *
   * @param userId  The ID of the user liking the event.
   * @param eventId The ID of the event to be liked.
   * @return An updated {@link EventViewDTO} representing the liked event.
   * @throws ResourceNotFoundException If no event with the given ID is found.
   * @throws BadRequestException       If the user has already liked the event.
   */
  public EventViewDTO likeEvent(String userId, String eventId) {
    Optional<Event> possibleEvent = eventRepository.findById(eventId);

    if (possibleEvent.isEmpty()) {
      throw new ResourceNotFoundException("The event with the given ID does not exist.");
    }

    Event event = possibleEvent.get();
    ObjectId userObjectId = new ObjectId(userId);

    if (event.getLikedBy().contains(userObjectId)) {
      throw new BadRequestException("You already liked this event!");
    }

    event.getLikedBy().add(userObjectId);
    eventRepository.save(event);

    return new EventViewDTO(event);
  }

  /**
   * Unlikes an event on behalf of a user and returns the updated {@link EventViewDTO}.
   *
   * @param userId  The ID of the user unliking the event.
   * @param eventId The ID of the event to be unliked.
   * @return An updated {@link EventViewDTO} representing the unliked event.
   * @throws ResourceNotFoundException If no event with the given ID is found.
   * @throws BadRequestException       If the user hasn't liked the event.
   */
  public EventViewDTO unlikeEvent(String userId, String eventId) {
    Optional<Event> possibleEvent = eventRepository.findById(eventId);

    if (possibleEvent.isEmpty()) {
      throw new ResourceNotFoundException("The event with the given ID does not exist.");
    }

    Event event = possibleEvent.get();
    ObjectId userObjectId = new ObjectId(userId);

    if (!event.getLikedBy().contains(userObjectId)) {
      throw new BadRequestException("You didn't like this event!");
    }

    event.getLikedBy().remove(userObjectId);
    eventRepository.save(event);

    return new EventViewDTO(event);
  }

  /**
   * Buys a ticket for the specified event on behalf of a user and returns the updated {@link EventViewDTO}.
   *
   * @param userId     The ID of the user buying the ticket.
   * @param eventId    The ID of the event for which the ticket is being bought.
   * @param ticketName The name of the ticket type being bought.
   * @return An updated {@link EventViewDTO} representing the event with the new participant.
   * @throws ResourceNotFoundException If no event with the given ID is found.
   * @throws BadRequestException       If the event is at its maximum capacity, the user is already attending the event,
   *                                   or the specified ticket type does not exist.
   * @throws RuntimeException          If an interruption occurs while simulating the ticket purchase.
   */
  public EventViewDTO buyTicket(String userId, String eventId, String ticketName) {
    Optional<Event> possibleEvent = eventRepository.findById(eventId);

    if (possibleEvent.isEmpty()) {
      throw new ResourceNotFoundException("The event with the given ID does not exist.");
    }

    Event event = possibleEvent.get();

    if (event.getParticipants().size() >= event.getCapacity()) {
      throw new BadRequestException("The event is at its maximum capacity.");
    }

    ObjectId userObjectId = new ObjectId(userId);

    if (event.getParticipants().stream().anyMatch(x -> x.getUserId().equals(userObjectId))) {
      throw new BadRequestException("You are already attending this event.");
    }

    TicketType ticketType = event.getTicketTypes()
                              .stream()
                              .filter(x -> x.getName().equals(ticketName))
                              .findFirst()
                              .orElseThrow(() -> new BadRequestException("Ticket type does not exist."));

    Ticket ticket = Ticket.Builder()
                      .withUserId(userObjectId)
                      .withEventId(event.getId())
                      .withName(ticketType.getName())
                      .withPrice(ticketType.getPrice())
                      .build();

    event.getParticipants().add(new Participant(userObjectId, ticket.getId(), ticketType.getName()));

    try {
      // Simulate buy
      Thread.sleep(new Random().nextInt(4500 - 2000 + 1) + 2000);
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }

    eventRepository.save(event);
    ticketRepository.save(ticket);

    return new EventViewDTO(event);
  }

  /**
   * Validates the properties of an {@link EventRequestDTO} and its associated country.
   *
   * @param payload The {@link EventRequestDTO} containing event details.
   * @param country An optional {@link Country} associated with the event's city.
   * @throws BadRequestException If validation fails, providing details about the specific validation issue.
   */
  private void validateEvent(EventRequestDTO payload, Optional<Country> country) {
    if (country.isEmpty()) {
      throw new BadRequestException("Country for city '%s' was not found.".formatted(payload.getCity()));
    }

    for (String category : payload.getCategories()) {
      if (categoryRepository.findFirstByName(category).isEmpty()) {
        throw new BadRequestException("Category '%s' does not exist.".formatted(category));
      }
    }

    List<TicketType> ticketTypes = payload.getTicketTypes();
    if (ticketTypes.stream()
          .distinct()
          .anyMatch(ticketType -> ticketTypes.stream().filter(t -> t.equals(ticketType)).count() > 1)
    ) {
      throw new BadRequestException("Ticket names must be unique!");
    }

    if (ticketTypes.stream().mapToInt(TicketType::getQuantity).sum() != payload.getCapacity()) {
      throw new BadRequestException("Total ticket quantity count does not match the capacity!");
    }
  }

  /**
   * Adds a new event based on the provided {@link EventRequestDTO} and user ID.
   *
   * @param payload The {@link EventRequestDTO} containing details for the new event.
   * @param userId  The ID of the user creating the event.
   * @return An {@link EventViewDTO} representing the newly created event.
   * @throws BadRequestException If validation fails during the event creation process.
   */
  public EventViewDTO addEvent(EventRequestDTO payload, String userId) {
    Optional<Country> optionalCountry = countryRepository.findCountryByIso2CodeAndCitiesContaining(
      payload.getCountryIso2Code(),
      payload.getCity()
    );

    this.validateEvent(payload, optionalCountry);

    Event event = payload.toEntity();
    Country country = optionalCountry.get();

    event.setCreatedBy(new ObjectId(userId));
    event.setGeoLocation(new GeoLocation(country.iso2Code, country.name, payload.getCity()));

    Event createdEvent = eventRepository.save(event);

    return new EventViewDTO(createdEvent);
  }

  /**
   * Updates an existing event with the provided ID using the details from the {@link EventRequestDTO}.
   *
   * @param id      The ID of the event to be updated.
   * @param payload The {@link EventRequestDTO} containing updated details for the event.
   * @return An {@link EventViewDTO} representing the updated event.
   * @throws ResourceNotFoundException If no event with the given ID is found.
   */
  public EventViewDTO updateEvent(String id, EventRequestDTO payload) {
    Optional<Country> optionalCountry = countryRepository.findCountryByIso2CodeAndCitiesContaining(
      payload.getCountryIso2Code(),
      payload.getCity()
    );

    this.validateEvent(payload, optionalCountry);

    Optional<Event> optionalEvent = eventRepository.findById(id);

    if (optionalEvent.isEmpty()) {
      throw new ResourceNotFoundException("The event with the given ID does not exist.");
    }

    Event existingEvent = optionalEvent.get();
    Country country = optionalCountry.get();

    existingEvent.setName(payload.getName());
    existingEvent.setCategories(payload.getCategories());
    existingEvent.setBannerImageURL(payload.getBannerImageURL());
    existingEvent.setDescription(payload.getDescription());
    existingEvent.setDateTime(payload.getDateTime());
    existingEvent.setGeoLocation(new GeoLocation(country.iso2Code, country.name, payload.getCity()));
    existingEvent.setCapacity(payload.getCapacity());
    existingEvent.setVenue(payload.getVenue());
    existingEvent.setGoogleMapsURL(payload.getGoogleMapsURL());
    existingEvent.setTicketTypes(payload.getTicketTypes());

    return new EventViewDTO(eventRepository.save(existingEvent));
  }

  /**
   * Deletes an event with the specified ID.
   *
   * @param id The ID of the event to be deleted.
   */
  public void deleteEvent(String id) {
    Optional<Event> event = eventRepository.findById(id);
    event.ifPresent(eventRepository::delete);
  }

}
