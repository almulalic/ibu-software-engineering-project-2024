package ba.edu.ibu.eventport.api.core.model.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * Model class representing a participant in an event.
 * <p>
 * This class includes fields for the user ID, ticket ID, and ticket type.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participant {

  /**
   * The unique identifier of the user participating in the event.
   */
  private ObjectId userId;

  /**
   * The unique identifier of the ticket associated with the participant.
   */
  private ObjectId ticketId;

  /**
   * The type of the ticket associated with the participant.
   */
  private String ticketType;
}
