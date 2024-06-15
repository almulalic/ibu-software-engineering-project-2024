package ba.edu.ibu.eventport.api.services;

import ba.edu.ibu.eventport.api.core.model.Category;
import ba.edu.ibu.eventport.api.core.model.Country;
import ba.edu.ibu.eventport.api.core.model.event.Event;
import ba.edu.ibu.eventport.api.core.model.event.GeoLocation;
import ba.edu.ibu.eventport.api.core.model.event.TicketType;
import ba.edu.ibu.eventport.api.core.repository.CategoryRepository;
import ba.edu.ibu.eventport.api.core.repository.CountryRepository;
import ba.edu.ibu.eventport.api.core.repository.EventRepository;
import ba.edu.ibu.eventport.api.core.repository.TicketRepository;
import ba.edu.ibu.eventport.api.core.repository.impl.FilterableEventRepositoryImpl;
import ba.edu.ibu.eventport.api.core.service.EventService;
import ba.edu.ibu.eventport.api.exception.general.BadRequestException;
import ba.edu.ibu.eventport.api.exception.repository.ResourceNotFoundException;
import ba.edu.ibu.eventport.api.rest.models.dto.EventRequestDTO;
import ba.edu.ibu.eventport.api.rest.models.dto.EventViewDTO;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EventServiceTests {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private FilterableEventRepositoryImpl filterableEventRepository;

    @Mock
    private CountryRepository countryRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private EventService eventService;

    private ObjectId adminId;

    private ObjectId genericEventId;

    private Event genericEvent;

    @BeforeAll
    public void init() {
        adminId = new ObjectId("5faabb7d8f388d8320a2c3a1");
        genericEventId = new ObjectId("5faabb7d8f388d8320a2c3a2");
        genericEvent = Event.Builder()
                         .withId(genericEventId)
                         .withName("Koncert Dine Merlina")
                         .withDescription("54 koncert Dine Merline u Beogradu.")
                         .withCategories(List.of("Music"))
                         .withDateTime(LocalDateTime.now())
                         .withVenue("Stark Arena")
                         .withGeoLocation(new GeoLocation("SR", "Srbija", "Beograd"))
                         .withCapacity(100)
                         .withCreatedBy(adminId)
                         .withParticipants(List.of())
                         .withBannerImageURL("https://starkarena.co.rs/data/DM_BEOGRAD_1140x760_Banner_4.jpg")
                         .withTicketTypes(List.of(new TicketType("Normal", "Normal", "EUR", 100, 100)))
                         .build();

        when(categoryRepository
               .findFirstByName("Music")
        ).thenReturn(
          Optional.of(new Category(new ObjectId(), "Music"))
        );

        when(countryRepository
               .findCountryByIso2CodeAndCitiesContaining("SR", "Beograd")
        ).thenReturn(
          Optional.of(new Country("SR", "Srbija", List.of("Beograd")))
        );

        MockitoAnnotations.openMocks(EventServiceTests.class);
        eventService = new EventService(
          eventRepository,
          filterableEventRepository,
          countryRepository,
          categoryRepository,
          ticketRepository
        );
    }

    @Test
    void getEventByIdWithExistingEvent() {
        String eventId = genericEvent.getId().toString();

        EventViewDTO expectedEventViewDTO = new EventViewDTO(genericEvent);

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(genericEvent));

        assertThat(expectedEventViewDTO).usingRecursiveComparison()
          .isEqualTo(eventService.getEventById(eventId));
        verify(eventRepository).findById(eventId);
    }

    @Test
    void getEventByIdWithNonExistingEvent() {
        String eventId = "nonExistingId";

        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> eventService.getEventById(eventId));
        verify(eventRepository).findById(eventId);
    }

    @Test
    void addEvent_withValidation() {
        EventRequestDTO eventRequestDTO = EventRequestDTO.Builder()
                                            .withName("Koncert Dine Merlina")
                                            .withDescription("54 koncert Dine Merline u Beogradu.")
                                            .withCategories(List.of("Muzika"))
                                            .withDateTime(LocalDateTime.now())
                                            .withVenue("Stark Arena")
                                            .withGoogleMapsURL(
                                              "https://www.google.com/maps?sca_esv=602517774&output=search&q=stark+arena&source=lnms&entry=mc")
                                            .withCountryIso2Code("BA")
                                            .withCity("Beograd")
                                            .withCapacity(100)
                                            .withBannerImageURL(
                                              "https://starkarena.co.rs/data/DM_BEOGRAD_1140x760_Banner_4.jpg")
                                            .withTicketTypes(
                                              List.of(
                                                new TicketType("Normal", "Normal", "EUR", 75, 100
                                                )
                                              )
                                            )
                                            .build();

        Event event = eventRequestDTO.toEntity();
        event.setId(new ObjectId("65b8493b19b8b1ea23ebc891"));

        when(eventRepository.save(any(Event.class))).thenReturn(event);

        assertThrows(
          BadRequestException.class,
          () -> eventService.addEvent(eventRequestDTO, adminId.toString())
        );

        eventRequestDTO.setCategories(List.of("Music"));

        assertThrows(
          BadRequestException.class,
          () -> eventService.addEvent(eventRequestDTO, adminId.toString())
        );

        eventRequestDTO.setCountryIso2Code("SR");

        assertThrows(
          BadRequestException.class,
          () -> eventService.addEvent(eventRequestDTO, adminId.toString())
        );

        eventRequestDTO.setCapacity(75);

        assertThat(new EventViewDTO(event)).usingRecursiveComparison()
          .isEqualTo(eventService.addEvent(eventRequestDTO, adminId.toString()));

        verify(eventRepository).save(any(Event.class));
    }

    @Test
    void testBuyTicket_WithValidation() {
        String eventId = genericEvent.getId().toString();

        when(eventRepository.findById(eventId)).thenReturn(Optional.ofNullable(genericEvent));

        assertThrows(
          ResourceNotFoundException.class,
          () -> eventService.buyTicket(adminId.toString(), "65b855edf1a12c7f78b61df4", "Norma")
        );

        assertThrows(
          BadRequestException.class,
          () -> eventService.buyTicket(adminId.toString(), eventId, "Norma")
        );

        eventService.buyTicket(adminId.toString(), eventId, "Normal");

        verify(ticketRepository).findById(eventId);
        verify(eventRepository, never()).save(any());
    }


    @Test
    void updateEventWithNonExistingEvent() {
        String eventId = "suygd97qgwsdashulllllkkk";

        EventRequestDTO updatedEventRequestDTO = EventRequestDTO.Builder()
                                                   .withName("Koncert Dine Merlina")
                                                   .withDescription("54 koncert Dine Merline u Beogradu.")
                                                   .withCategories(List.of("Music"))
                                                   .withDateTime(LocalDateTime.now())
                                                   .withVenue("Stark Arena Nova")
                                                   .withGoogleMapsURL("")
                                                   .withCountryIso2Code("SR")
                                                   .withCity("Beograd")
                                                   .withCapacity(75)
                                                   .withBannerImageURL("")
                                                   .withTicketTypes(List.of(new TicketType(
                                                     "Normal",
                                                     "Normal",
                                                     "EUR",
                                                     75,
                                                     100
                                                   )))
                                                   .build();

        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        assertThrows(
          ResourceNotFoundException.class,
          () -> eventService.updateEvent(updatedEventRequestDTO.getId(), updatedEventRequestDTO)
        );

        verify(eventRepository).findById(eventId);
        verify(eventRepository, never()).save(any());
    }

    @Test
    void deleteEvent_WithExistingEvent() {
        String eventId = "wouegf08ndqnq9ni9";
        Event existingEvent = new Event();

        when(eventRepository.findById(eventId)).thenReturn(Optional.of(existingEvent));

        eventService.deleteEvent(eventId);

        verify(eventRepository).findById(eventId);
        verify(eventRepository).delete(existingEvent);
    }

    @Test
    void deleteEvent_WithNonExistingEvent() {
        String eventId = "nonExistingId";

        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        eventService.deleteEvent(eventId);

        verify(eventRepository).findById(eventId);
        verify(eventRepository, never()).delete(any());
    }
}
