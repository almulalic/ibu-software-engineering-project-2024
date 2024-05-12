package ba.edu.ibu.eventport.auth.core.model;

import ba.edu.ibu.eventport.auth.core.model.enums.AuthType;
import ba.edu.ibu.eventport.auth.core.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;
import io.jsonwebtoken.Claims;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Model class representing a user.
 */
@Document
@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class User implements UserDetails {

  /**
   * Unique identifier for the user.
   */
  @Id
  private String id;

  /**
   * List of roles assigned to the user.
   */
  @NonNull
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
   * The username of the user.
   */
  private String username;

  /**
   * The email address of the user.
   */
  private String email;

  /**
   * The display name of the user.
   */
  private String displayName;

  /**
   * The password of the user.
   */
  @NotEmpty
  @JsonIgnore
  private String password;

  /**
   * The creation date of the user account.
   */
  private Date creationDate;

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

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
