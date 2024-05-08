package ba.edu.ibu.eventport.auth.core.repository;

import ba.edu.ibu.eventport.auth.core.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Repository interface for managing users in the database.
 */
public interface UserRepository extends MongoRepository<User, String> {

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
}
