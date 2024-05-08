package ba.edu.ibu.eventport.auth.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * Model class representing a refresh token.
 */
@Document
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class RefreshToken {

  /**
   * Unique identifier for the refresh token.
   */
  @Id
  private String id;

  /**
   * Reference to the user associated with the refresh token.
   */
  @DBRef
  private User user;

  /**
   * The refresh token string.
   */
  private String token;

  /**
   * The expiry date of the refresh token.
   */
  private Instant expiryDate;
}
