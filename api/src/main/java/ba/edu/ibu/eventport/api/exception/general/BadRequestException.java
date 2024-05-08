package ba.edu.ibu.eventport.api.exception.general;

import ba.edu.ibu.eventport.api.exception.GenericHttpException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception indicating a bad request.
 * <p>
 * This exception is thrown when the client has made an invalid request, and the server cannot or will not process it.
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadRequestException extends GenericHttpException {
  public BadRequestException(String message) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
