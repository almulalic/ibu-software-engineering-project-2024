package ba.edu.ibu.eventport.api.rest.controllers;

import ba.edu.ibu.eventport.api.core.service.NotificationService;
import ba.edu.ibu.eventport.api.rest.models.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller handling API endpoints related to notifications.
 */
@RestController
@RequestMapping(path = "/api/notifications")
public class NotificationController {

  private final NotificationService notificationService;

  /**
   * Constructor for NotificationController.
   *
   * @param notificationService NotificationService instance.
   */
  public NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  /**
   * Send a broadcast message to all connected clients.
   *
   * @param message MessageDTO containing the message details.
   * @return ResponseEntity with HttpStatus.NO_CONTENT.
   */
  @RequestMapping(path = "/broadcast", method = RequestMethod.POST)
  public ResponseEntity<Void> sendBroadcastMessage(
    @RequestBody MessageDTO message
  ) {
    System.out.println("The message is: " + message.getMessage());
    notificationService.broadcastMessage(message.getMessage());
    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
  }

  /**
   * Send a chat message to a specific user identified by userId.
   *
   * @param userId  String representing the user ID.
   * @param message MessageDTO containing the message details.
   * @return ResponseEntity with HttpStatus.NO_CONTENT.
   */
  @RequestMapping(path = "/send-to/{userId}", method = RequestMethod.POST)
  @PreAuthorize("hasAnyAuthority('LIBRARIAN', 'ADMIN')")
  public ResponseEntity<Void> sendChatMessage(
    @PathVariable String userId,
    @RequestBody MessageDTO message
  ) {
    System.out.println("The message is: " + message.getMessage());
    notificationService.sendMessage(userId, message.getMessage());
    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
  }
}
