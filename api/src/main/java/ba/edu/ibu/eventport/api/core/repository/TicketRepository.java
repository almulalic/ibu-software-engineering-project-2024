package ba.edu.ibu.eventport.api.core.repository;

import ba.edu.ibu.eventport.api.core.model.Ticket;
import ba.edu.ibu.eventport.api.rest.models.dto.EventTicket;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Repository interface for managing {@link Ticket} entities in the database.
 */
public interface TicketRepository extends MongoRepository<Ticket, String> {

  /**
   * Retrieves a list of tickets for events that the user is attending.
   *
   * @param userId   The unique identifier of the user.
   * @param pageable The pageable information for pagination.
   * @return A list of {@link EventTicket} DTOs representing tickets for events the user is attending.
   */
  @Aggregation(
    pipeline = {
      "{ $match: { userId: ObjectId('?0') } }",
      "{ $project: { _id: 0, ticketType: { _id: '$id', eventId: '$eventId', name: '$name',  price: '$price', userId: '$userId' } } }",
      "{ $lookup: { from: 'event', localField: 'ticketType.eventId', foreignField: '_id', as: 'event' } } ",
      "{ $project: { event: { $arrayElemAt: ['$event', 0] }, ticketType: 1 } }"
    }
  )
  List<EventTicket> findUserAttendingEvents(ObjectId userId, Pageable pageable);
}
