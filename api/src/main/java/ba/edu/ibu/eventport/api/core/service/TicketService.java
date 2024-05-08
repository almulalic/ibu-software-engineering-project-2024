package ba.edu.ibu.eventport.api.core.service;

import ba.edu.ibu.eventport.api.core.repository.TicketRepository;
import ba.edu.ibu.eventport.api.exception.repository.ResourceNotFoundException;
import ba.edu.ibu.eventport.api.rest.models.dto.TicketDTO;
import ba.edu.ibu.eventport.api.rest.models.dto.TicketRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ba.edu.ibu.eventport.api.core.model.Ticket;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {
  private final TicketRepository ticketRepository;

  public List<TicketDTO> getTickets() {
    List<Ticket> tickets = ticketRepository.findAll();

    return tickets.stream().map(TicketDTO::new).collect(Collectors.toList());
  }

  public TicketDTO getTicketById(String id) {
    Optional<Ticket> ticket = ticketRepository.findById(id);

    if (ticket.isEmpty()) {
      throw new ResourceNotFoundException("The ticket with the given ID does not exists.");
    }

    return new TicketDTO(ticket.get());
  }

  public TicketDTO addTicket(TicketRequestDTO payload) {
    Ticket ticket = ticketRepository.save(payload.toEntity());
    return new TicketDTO(ticket);
  }

  public TicketDTO updateTicket(String id, TicketRequestDTO payload) {
    Optional<Ticket> ticket = ticketRepository.findById(id);

    if (ticket.isEmpty()) {
      throw new ResourceNotFoundException("The ticket with the given ID does not exists.");
    }

    Ticket updatedTicket = payload.toEntity();
    updatedTicket.setId(ticket.get().getId());
    updatedTicket = ticketRepository.save(updatedTicket);
    return new TicketDTO(updatedTicket);
  }

  public void deleteTicket(String id) {
    Optional<Ticket> ticket = ticketRepository.findById(id);
    ticket.ifPresent(ticketRepository::delete);
  }
}
