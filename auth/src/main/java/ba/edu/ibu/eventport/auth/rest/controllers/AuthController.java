package ba.edu.ibu.eventport.auth.rest.controllers;

import ba.edu.ibu.eventport.auth.core.service.AuthService;
import ba.edu.ibu.eventport.auth.rest.models.dto.CreateUserRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.UserDTO;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.GenerateTokenRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.RefreshTokenRequest;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.RefreshTokenResponse;
import ba.edu.ibu.eventport.auth.rest.models.dto.token.TokenResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for handling authentication-related requests.
 */
@RestController
@RequestMapping("api/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
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
}
