package ba.edu.ibu.eventport.auth.rest.models.dto.token;

import ba.edu.ibu.eventport.auth.core.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO class representing a response containing token information.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class TokenResponse {

  /**
   * The user associated with the token.
   */
  private User user;

  /**
   * The access token.
   */
  private String accessToken;

  /**
   * The refresh token.
   */
  private String refreshToken;
}
