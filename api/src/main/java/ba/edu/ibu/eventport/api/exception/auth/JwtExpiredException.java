package ba.edu.ibu.eventport.api.exception.auth;


import ba.edu.ibu.eventport.api.exception.GenericHttpException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception indicating that the JWT (JSON Web Token) has expired.
 * <p>
 * This exception is thrown when attempting to use an expired JWT for authentication.
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class JwtExpiredException extends GenericHttpException {
  public JwtExpiredException() {
    super(HttpStatus.UNAUTHORIZED, "JWT Expired!");
  }
}