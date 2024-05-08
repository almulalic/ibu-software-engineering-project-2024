package ba.edu.ibu.eventport.api.core.model.event;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Model class representing a type of ticket for an event.
 * <p>
 * This class includes fields for the name, description, currency, quantity, and price of the ticket.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketType {

  /**
   * The name of the ticket type.
   */
  private String name;

  /**
   * A description of the ticket type.
   */
  private String description;

  /**
   * The currency associated with the ticket type.
   */
  private String currency;

  /**
   * The quantity of tickets available for this type.
   */
  private int quantity;

  /**
   * The price of each ticket in the specified currency.
   */
  private double price;
}
