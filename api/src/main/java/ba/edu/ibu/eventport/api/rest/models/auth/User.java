package ba.edu.ibu.eventport.api.rest.models.auth;

import ba.edu.ibu.eventport.api.rest.models.auth.enums.Role;
import ba.edu.ibu.eventport.api.rest.models.auth.enums.AuthType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.jsonwebtoken.Claims;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Represents a user in the system.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderClassName = "Builder", builderMethodName = "Builder", setterPrefix = "with")
public class User implements UserDetails {

  /**
   * The unique identifier for the user.
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
   * The first name of the user.
   */
  private String firstName;

  /**
   * The last name of the user.
   */
  private String lastName;

  /**
   * The email address of the user.
   */
  private String email;

  /**
   * The username of the user.
   */
  private String username;

  /**
   * The password of the user.
   */
  @NotEmpty
  @JsonIgnore
  private String password;

  /**
   * The date when the user account was created.
   */
  private Date creationDate;

  /**
   * Checks if the user account is non-expired.
   *
   * @return Always returns true.
   */
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  /**
   * Checks if the user account is non-locked.
   *
   * @return Always returns true.
   */
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  /**
   * Checks if the user credentials are non-expired.
   *
   * @return Always returns true.
   */
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  /**
   * Checks if the user account is enabled.
   *
   * @return Always returns true.
   */
  @Override
  public boolean isEnabled() {
    return true;
  }

  /**
   * Retrieves the authorities (roles) granted to the user.
   *
   * @return A collection of authorities.
   */
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return assignedRoles.stream().map(role -> new SimpleGrantedAuthority(role.name())).toList();
  }

  /**
   * Creates a User object from JWT claims.
   *
   * @param claims The claims extracted from a JWT.
   * @return A User object.
   */
  public static User fromJwt(Claims claims) {
    User user = new User();
    user.setId(claims.get("id", String.class));
    user.setUsername(claims.get("email", String.class));
    user.setFirstName(claims.get("firstName", String.class));
    user.setLastName(claims.get("lastName", String.class));
    user.setEmail(claims.get("email", String.class));

    user.setAssignedRoles(
      ((List<String>) claims.get("assignedRoles", List.class))
        .stream()
        .map(Role::valueOf)
        .toList()
    );

    return user;
  }
}
