package ba.edu.ibu.eventport.auth.exception.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import ba.edu.ibu.eventport.auth.exception.GenericHttpException;

/**
 * Exception thrown when a unauthorized attempt is made.
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends GenericHttpException {
  public UnauthorizedException(String message) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
