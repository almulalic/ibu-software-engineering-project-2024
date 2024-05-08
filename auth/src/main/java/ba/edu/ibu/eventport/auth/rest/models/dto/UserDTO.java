package ba.edu.ibu.eventport.auth.rest.models.dto;

import ba.edu.ibu.eventport.auth.core.model.User;
import ba.edu.ibu.eventport.auth.core.model.enums.AuthType;
import ba.edu.ibu.eventport.auth.core.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/**
 * DTO class representing user information.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

  /**
   * The ID of the user.
   */
  private String id;

  /**
   * The list of roles assigned to the user.
   */
  private List<Role> assignedRoles;

  /**
   * The authentication type of the user.
   */
  private AuthType authType;

  /**
   * The full name of the user.
   */
  private String name;

  /**
   * The email address of the user.
   */
  private String email;

  /**
   * The display name of the user.
   */
  private String displayName;

  /**
   * The creation date of the user account.
   */
  private Date creationDate;

  /**
   * Constructs a UserDTO object from a User entity.
   *
   * @param user The User entity.
   */
  public UserDTO(User user) {
    this.id = user.getId();
    this.name = user.getFirstName() + " " + user.getLastName();
    this.displayName = user.getDisplayName();
    this.assignedRoles = user.getAssignedRoles();
    this.authType = user.getAuthType();
    this.email = user.getEmail();
    this.creationDate = user.getCreationDate();
  }
}
