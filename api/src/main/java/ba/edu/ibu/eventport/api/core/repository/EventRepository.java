package ba.edu.ibu.eventport.api.core.repository;

import ba.edu.ibu.eventport.api.core.model.event.Event;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Repository interface for managing {@link Event} entities in the database.
 */
public interface EventRepository extends MongoRepository<Event, String>,
                                         PagingAndSortingRepository<Event, String> {

  /**
   * Retrieves a list of events with the specified category.
   *
   * @param category The category to filter events.
   * @return A list of events with the specified category.
   */
  @Aggregation(
    pipeline = {
      "{ $match: { organizerName: ?0 } }",
      "{ $project: { organizerName: 1, participants: 1, capacity: 1, participantCount: { $size: '$participants' } } }",
      "{ $match: { participantCount: { $lt: '$capacity' } } }"
    }
  )
  List<Event> findByCategory(String category);

  /**
   * Finds the top 10 events ordered by the length of the likedBy array in descending order.
   *
   * @return a list of the top 10 events
   */
  @Query(value = "{}", sort = "{ 'likedBy.length' : -1 }")
  @Aggregation(
    pipeline = {
      "{ $sort: { 'likedBy.length' : -1 } }",
      "{ $limit: 10 }"
    }
  )
  List<Event> findTop10LikedDesc();

  /**
   * Retrieves a list of events created by the user with the specified ID.
   *
   * @param userId   The unique identifier of the user.
   * @param pageable The pageable information for pagination.
   * @return A list of events created by the user.
   */
  @Query("{'createdBy': ?0}")
  List<Event> findUserCreatedEvents(ObjectId userId, Pageable pageable);

  /**
   * Retrieves a list of events liked by the user with the specified ID.
   *
   * @param userId   The unique identifier of the user.
   * @param pageable The pageable information for pagination.
   * @return A list of events liked by the user.
   */
  @Query("{'likedBy': ?0}")
  List<Event> findUserLikedEvents(ObjectId userId, Pageable pageable);
}
