package ba.edu.ibu.eventport.auth.core.repository;

import ba.edu.ibu.eventport.auth.core.model.RefreshToken;
import ba.edu.ibu.eventport.auth.core.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing refresh tokens in the database.
 */
@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {

  /**
   * Finds a refresh token by its token string.
   *
   * @param token The token string.
   * @return The optional refresh token object.
   */
  Optional<RefreshToken> findByToken(String token);

  /**
   * Deletes refresh tokens by user ID.
   *
   * @param userId The ID of the user associated with the refresh token.
   */
  void deleteByUserId(String userId);
}
