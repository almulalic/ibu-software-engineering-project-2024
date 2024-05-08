package ba.edu.ibu.eventport.auth.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import ba.edu.ibu.eventport.auth.exception.GenericHttpException;

/**
 * Exception thrown when a token refresh fails.
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class TokenRefreshException extends GenericHttpException {
  public TokenRefreshException(String token, String message) {
    super(HttpStatus.UNAUTHORIZED, String.format("Failed for [%s]: %s", token, message));
  }
}
