package ba.edu.ibu.eventport.auth.core.service;

import ba.edu.ibu.eventport.auth.exception.BadRequestException;
import ba.edu.ibu.eventport.auth.exception.repository.UserNotFoundException;
import ba.edu.ibu.eventport.auth.rest.models.dto.EditUserRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ba.edu.ibu.eventport.auth.core.model.User;
import ba.edu.ibu.eventport.auth.rest.models.dto.UserDTO;
import ba.edu.ibu.eventport.auth.core.repository.UserRepository;
import ba.edu.ibu.eventport.auth.rest.models.dto.CreateUserRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Retrieves all users.
   *
   * @return List of UserDTOs representing the users.
   */
  public List<UserDTO> getUsers() {
    List<User> users = userRepository.findAll();

    return users.stream()
             .map(UserDTO::new)
             .collect(Collectors.toList());
  }

  /**
   * Retrieves a user by ID.
   *
   * @param id The ID of the user.
   * @return UserDTO representing the user.
   * @throws UserNotFoundException if the user with the given ID does not exist.
   */
  public UserDTO getUserById(String id) {
    Optional<User> user = userRepository.findById(id);

    if (user.isEmpty()) {
      throw new UserNotFoundException("The user with the given ID does not exist.");
    }

    return new UserDTO(user.get());
  }

  /**
   * Retrieves a user by username or email.
   *
   * @param identifier The username or email of the user.
   * @return The User object representing the user.
   * @throws UserNotFoundException if the user with the given username or email does not exist.
   */
  public User getUser(String identifier) {
    Optional<User> user = userRepository.findByUsernameOrEmail(identifier, identifier);

    if (user.isEmpty()) {
      throw new UserNotFoundException("The user with the given ID does not exist.");
    }

    return user.get();
  }

  /**
   * Checks if a user with the given username or email exists.
   *
   * @param username The username of the user.
   * @param email    The email address of the user.
   * @return The User object representing the user.
   * @throws UserNotFoundException if the user with the given username or email does not exist.
   */
  public User isUniqueUser(String username, String email) {
    Optional<User> user = userRepository.findByUsernameOrEmail(username, email);

    if (user.isEmpty()) {
      throw new UserNotFoundException("The user with the given ID does not exist.");
    }

    return user.get();
  }

  /**
   * Adds a new user.
   *
   * @param payload The CreateUserRequest object representing the user to be added.
   * @return The UserDTO representing the added user.
   */
  public UserDTO addUser(CreateUserRequest payload) {
    return new UserDTO(userRepository.save(payload.toEntity()));
  }

  /**
   * Updates an existing user.
   *
   * @param id      The ID of the user to be updated.
   * @param payload The CreateUserRequest object representing the updated user information.
   * @return The UserDTO representing the updated user.
   * @throws UserNotFoundException if the user with the given ID does not exist.
   */
  public UserDTO updateUser(String id, EditUserRequest payload) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isEmpty()) {
      throw new UserNotFoundException("The user with the given ID does not exist.");
    }

    Optional<User> userWithEmail = userRepository.findByEmail(payload.getEmail());

    if (userWithEmail.isPresent() && !userWithEmail.get().getId().equals(id)) {
      throw new BadRequestException("User with that email already exists");
    }

    Optional<User> userWithUsername = userRepository.findByUsername(payload.getDisplayName());

    if (userWithUsername.isPresent() && !userWithUsername.get().getId().equals(id)) {
      throw new BadRequestException("User with that username already exists");
    }

    User updatedUser = optionalUser.get();
    updatedUser.setFirstName(payload.getFirstName());
    updatedUser.setLastName(payload.getLastName());
    updatedUser.setDisplayName(payload.getDisplayName());
    updatedUser.setEmail(payload.getEmail());

    updatedUser = userRepository.save(updatedUser);
    return new UserDTO(updatedUser);
  }

  /**
   * Deletes a user by ID.
   *
   * @param id The ID of the user to be deleted.
   */
  public void deleteUser(String id) {
    Optional<User> user = userRepository.findById(id);
    user.ifPresent(userRepository::delete);
  }

  /**
   * Provides a UserDetailsService implementation for Spring Security.
   *
   * @return The UserDetailsService instance.
   */
  public UserDetailsService userDetailsService() {
    return identifier -> userRepository.findByUsernameOrEmail(identifier, identifier)
             .orElseThrow(() -> new UsernameNotFoundException("User not found."));
  }
}
