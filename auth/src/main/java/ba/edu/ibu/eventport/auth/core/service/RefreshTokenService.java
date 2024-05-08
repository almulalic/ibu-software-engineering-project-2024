package ba.edu.ibu.eventport.auth.core.service;

import ba.edu.ibu.eventport.auth.core.model.RefreshToken;
import ba.edu.ibu.eventport.auth.core.repository.RefreshTokenRepository;
import ba.edu.ibu.eventport.auth.core.repository.UserRepository;
import ba.edu.ibu.eventport.auth.exception.auth.TokenRefreshException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/**
 * Service class for managing refresh tokens.
 */
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  @Value("${security.jwt.jwtRefreshExpirationMs}")
  private Long refreshTokenDurationMs;

  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;

  /**
   * Retrieves a refresh token by its token string.
   *
   * @param token The token string to search for.
   * @return An optional containing the refresh token, or empty if not found.
   */
  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

  /**
   * Creates a new refresh token for the given user ID.
   *
   * @param userId The ID of the user for whom the refresh token is created.
   * @return The newly created refresh token.
   */
  public RefreshToken createRefreshToken(String userId) {
    RefreshToken refreshToken = new RefreshToken();

    refreshToken.setUser(userRepository.findById(userId).get());
    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
    refreshToken.setToken(UUID.randomUUID().toString());

    refreshToken = refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  /**
   * Verifies if a refresh token has expired.
   *
   * @param token The refresh token to be verified.
   * @return The refresh token if it has not expired.
   * @throws TokenRefreshException If the refresh token has expired.
   */
  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new TokenRefreshException(token.getToken(),
        "Refresh token was expired. Please make a new sign-in request");
    }

    return token;
  }

  /**
   * Deletes all refresh tokens associated with a user.
   *
   * @param userId The ID of the user whose refresh tokens should be deleted.
   */
  public void deleteByUserId(String userId) {
    refreshTokenRepository.deleteByUserId(userId);
  }
}
