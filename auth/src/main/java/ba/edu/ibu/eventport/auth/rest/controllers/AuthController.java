package ba.edu.ibu.eventport.auth.rest.controllers;

import ba.edu.ibu.eventport.auth.core.model.User;
import ba.edu.ibu.eventport.auth.core.service.AuthService;
import ba.edu.ibu.eventport.auth.core.service.UserService;
import ba.edu.ibu.eventport.auth.rest.models.dto.CreateUserRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.EditRoleRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.EditRoleRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.EditUserRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.UserDTO;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.GenerateTokenRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.RefreshTokenRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.RefreshTokenResponse;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.TokenResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling authentication-related requests.
 */
@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final AuthService authService;
  private final UserService userService;

  public AuthController(AuthService authService, UserService userService) {

    this.authService = authService;
    this.userService = userService;
  }

  @RequestMapping(method = RequestMethod.GET, path = "/user/search")
  public ResponseEntity<List<UserDTO>> searchUsers(
    @RequestParam(required = false) String searchText
  ) {
    return ResponseEntity.ok(this.authService.getUsers(searchText).stream().map(UserDTO::new).toList());
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/user/edit/role")
  public ResponseEntity<UserDTO> editUserRole(
    @Valid @RequestBody EditRoleRequest dto
  ) {
    return ResponseEntity.ok(new UserDTO(this.authService.editUserRoles(dto)));
  }

  @RequestMapping(method = RequestMethod.POST, path = "/signup")
  public ResponseEntity<UserDTO> createUser(
    @Valid @RequestBody CreateUserRequest dto
  ) {
    return ResponseEntity.ok(new UserDTO(this.authService.createUser(dto)));
  }

  @RequestMapping(method = RequestMethod.POST, path = "/token/generate")
  public ResponseEntity<TokenResponse> generateToken(
    @Valid @RequestBody GenerateTokenRequest dto
  ) {
    return ResponseEntity.ok(this.authService.generateToken(dto));
  }

  @RequestMapping(method = RequestMethod.POST, path = "/token/refresh")
  public ResponseEntity<RefreshTokenResponse> refreshToken(
    @Valid @RequestBody RefreshTokenRequest dto
  ) {
    return ResponseEntity.ok(this.authService.refreshToken(dto));
  }

  @RequestMapping(method = RequestMethod.PUT, path = "/user")
  public ResponseEntity<UserDTO> updateUser(
    HttpServletRequest request,
    @Valid @RequestBody
    EditUserRequest dto
  ) {
    User user = ((User) request.getAttribute("user"));
    return ResponseEntity.ok(this.userService.updateUser(user.getId(), dto));
  }
}
