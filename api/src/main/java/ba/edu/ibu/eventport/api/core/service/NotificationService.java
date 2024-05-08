package ba.edu.ibu.eventport.api.core.service;

import ba.edu.ibu.eventport.api.rest.websockets.MainSocketHandler;
import org.springframework.stereotype.Service;

/**
 * Service class for handling notifications and broadcasting messages through websockets.
 */
@Service
public class NotificationService {

  private final MainSocketHandler mainSocketHandler;

  /**
   * Constructs a new instance of NotificationService.
   *
   * @param mainSocketHandler The MainSocketHandler used for handling websocket interactions.
   */
  public NotificationService(MainSocketHandler mainSocketHandler) {
    this.mainSocketHandler = mainSocketHandler;
  }

  /**
   * Broadcasts a message to all connected clients through websockets.
   *
   * @param message The message to be broadcasted.
   */
  public void broadcastMessage(String message) {
    mainSocketHandler.broadcastMessage(message);
  }

  /**
   * Sends a message to a specific user identified by userId through websockets.
   *
   * @param userId  The unique identifier of the user.
   * @param message The message to be sent to the user.
   */
  public void sendMessage(String userId, String message) {
    mainSocketHandler.sendMessage(userId, message);
  }
}
