package ba.edu.ibu.eventport.api.rest.models.dto;

import ba.edu.ibu.eventport.api.core.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * Data Transfer Object (DTO) representing a Ticket.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderClassName = "Builder", builderMethodName = "Builder", setterPrefix = "with")
public class TicketDTO {

  /**
   * The unique identifier for the ticket.
   */
  private ObjectId id;

  /**
   * The unique identifier for the associated event.
   */
  private ObjectId eventId;

  /**
   * The unique identifier for the user who owns the ticket.
   */
  private ObjectId userId;

  /**
   * The name of the ticket.
   */
  private String name;

  /**
   * The currency of the ticket.
   */
  private String currency;

  /**
   * The price of the ticket.
   */
  private double price;

  /**
   * Constructs a TicketDTO based on a Ticket entity.
   *
   * @param ticket The Ticket entity to construct the DTO from.
   */
  public TicketDTO(Ticket ticket) {
    this.id = ticket.getId();
    this.eventId = ticket.getEventId();
    this.userId = ticket.getUserId();
    this.name = ticket.getName();
    this.currency = ticket.getCurrency();
    this.price = ticket.getPrice();
  }
}
