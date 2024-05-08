package ba.edu.ibu.eventport.api.rest.controllers;

import ba.edu.ibu.eventport.api.exception.repository.ResourceNotFoundException;
import ba.edu.ibu.eventport.api.rest.models.dto.TicketDTO;
import ba.edu.ibu.eventport.api.rest.models.dto.TicketRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ba.edu.ibu.eventport.api.core.service.TicketService;

import java.util.List;

/**
 * Controller handling API endpoints related to tickets.
 */
@RestController
@RequestMapping("api/tickets")
public class TicketController {

  private final TicketService ticketService;

  /**
   * Constructor for TicketController.
   *
   * @param ticketService TicketService instance.
   */
  public TicketController(final TicketService ticketService) {
    this.ticketService = ticketService;
  }

  /**
   * Get a list of all tickets.
   *
   * @return ResponseEntity with a list of TicketDTO.
   */
  @RequestMapping(method = RequestMethod.GET, path = "/")
  public ResponseEntity<List<TicketDTO>> getTickets() {
    return ResponseEntity.ok(ticketService.getTickets());
  }

  /**
   * Get ticket details by ID.
   *
   * @param id String representing the ticket ID.
   * @return ResponseEntity with TicketDTO.
   */
  @RequestMapping(method = RequestMethod.GET, path = "/{id}")
  public ResponseEntity<TicketDTO> getTicketById(
    @PathVariable String id
  ) {
    return ResponseEntity.ok(ticketService.getTicketById(id));
  }

  /**
   * Register a new ticket.
   *
   * @param ticket TicketRequestDTO containing the ticket details.
   * @return ResponseEntity with TicketDTO.
   */
  @RequestMapping(method = RequestMethod.POST, path = "/register")
  public ResponseEntity<TicketDTO> register(
    @RequestBody TicketRequestDTO ticket
  ) {
    return ResponseEntity.ok(ticketService.addTicket(ticket));
  }

  /**
   * Update ticket details by ID.
   *
   * @param id     String representing the ticket ID.
   * @param ticket TicketRequestDTO containing the updated ticket details.
   * @return ResponseEntity with TicketDTO.
   */
  @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
  public ResponseEntity<TicketDTO> updateTicket(
    @PathVariable String id,
    @RequestBody TicketRequestDTO ticket
  ) {
    return ResponseEntity.ok(ticketService.updateTicket(id, ticket));
  }

  /**
   * Delete a ticket by ID.
   *
   * @param id String representing the ticket ID.
   * @return ResponseEntity with HttpStatus.NO_CONTENT.
   */
  @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
  public ResponseEntity<Void> deleteTicket(
    @PathVariable String id
  ) {
    ticketService.deleteTicket(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
