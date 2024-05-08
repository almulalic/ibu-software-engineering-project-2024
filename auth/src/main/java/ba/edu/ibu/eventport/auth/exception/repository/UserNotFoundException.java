package ba.edu.ibu.eventport.auth.exception.repository;

import ba.edu.ibu.eventport.auth.exception.GenericHttpException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserNotFoundException extends GenericHttpException {
  public UserNotFoundException(String message) {
    super(HttpStatus.NOT_FOUND, message);
  }
}

