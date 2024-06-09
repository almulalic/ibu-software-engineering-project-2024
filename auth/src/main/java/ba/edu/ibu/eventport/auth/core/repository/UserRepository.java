package ba.edu.ibu.eventport.auth.core.repository;

import ba.edu.ibu.eventport.auth.core.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing users in the database.
 */
public interface UserRepository extends MongoRepository<User, String> {

  /**
   * Searches for users based on the provided search criteria.
   *
   * @param search The search criteria.
   * @return List of users matching the search criteria.
   */
  @Query("""
        {
          $or:[
            { 'email': { $regex: ?0, $options: 'i' } },
            { 'displayName': { $regex: ?0, $options: 'i' } },
            { 'firstName': { $regex: ?0, $options: 'i' } },
            { 'lastName': { $regex: ?0, $options: 'i' } }
           ]
          }
    """)
  List<User> search(String search);

  /**
   * Finds a user by username or email.
   *
   * @param username The username of the user.
   * @param email    The email address of the user.
   * @return The optional user object.
   */
  Optional<User> findByUsernameOrEmail(String username, String email);

  /**
   * Finds a user by email.
   *
   * @param email The email address of the user.
   * @return The optional user object.
   */
  Optional<User> findByEmail(String email);

  /**
   * Finds a user by username.
   *
   * @param email The username of the user.
   * @return The optional user object.
   */
  Optional<User> findByUsername(String username);
}
