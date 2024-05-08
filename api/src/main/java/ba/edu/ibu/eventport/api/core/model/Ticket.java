package ba.edu.ibu.eventport.api.core.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class representing a ticket.
 * <p>
 * This class includes fields for the unique identifier, event identifier, user identifier, name, currency, and price of the ticket.
 */
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderClassName = "Builder", builderMethodName = "Builder", setterPrefix = "with", toBuilder = true)
public class Ticket {

  /**
   * The unique identifier for the ticket.
   */
  private ObjectId id;

  /**
   * The unique identifier of the event associated with the ticket.
   */
  private ObjectId eventId;

  /**
   * The unique identifier of the user associated with the ticket.
   */
  private ObjectId userId;

  /**
   * The name of the ticket.
   */
  private String name;

  /**
   * The currency associated with the ticket.
   */
  private String currency;

  /**
   * The price of the ticket.
   */
  private double price;
}
