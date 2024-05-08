package ba.edu.ibu.eventport.api.rest.models.dto;

import ba.edu.ibu.eventport.api.core.model.Ticket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * Data Transfer Object (DTO) representing a request to create or update a Ticket.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderClassName = "Builder", builderMethodName = "Builder", setterPrefix = "with")
public class TicketRequestDTO {

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
   * Converts the TicketRequestDTO to a Ticket entity.
   *
   * @return A Ticket entity created from the TicketRequestDTO.
   */
  public Ticket toEntity() {
    return Ticket.Builder()
             .withEventId(eventId)
             .withUserId(userId)
             .withName(name)
             .withCurrency(currency)
             .withPrice(price)
             .build();
  }
}
