package ba.edu.ibu.eventport.api.rest.websockets;

import ba.edu.ibu.eventport.api.rest.models.auth.User;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.HashMap;

/**
 * Handles WebSocket connections and messages for real-time communication.
 */
@Component
public class MainSocketHandler implements WebSocketHandler {

  /**
   * Map to store WebSocket sessions associated with user IDs.
   */   
  public HashMap<Object, WebSocketSession> sessions = new HashMap<>();

  /**
   * Default constructor for MainSocketHandler.
   */
  public MainSocketHandler() {
  }

  /**
   * Invoked after a new WebSocket connection is established.
   *
   * @param session The WebSocket session.
   */
  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    User user = new User();
    user.setId("blabla");

    sessions.put(user.getId(), session);
    System.out.println("Session created for the user " + user.getId() + " where the session id is " + session.getId());
  }

  /**
   * Invoked when a transport error occurs.
   *
   * @param session   The WebSocket session.
   * @param exception The exception causing the error.
   */
  @Override
  public void handleTransportError(WebSocketSession session, Throwable exception) {
    System.out.println("Error happened " + session.getId() + " with reason ### " + exception.getMessage());
  }

  /**
   * Invoked after a WebSocket connection is closed.
   *
   * @param session     The WebSocket session.
   * @param closeStatus The close status.
   */
  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) {
    System.out.println(
      "Connection closed for session " + session.getId() + " with status ### " + closeStatus.getReason());
  }

  /**
   * Determines whether the handler supports partial messages.
   *
   * @return Always returns false.
   */
  @Override
  public boolean supportsPartialMessages() {
    return false;
  }

  /**
   * Handles incoming WebSocket messages.
   *
   * @param session The WebSocket session.
   * @param message The incoming message.
   */
  @Override
  public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) {
    String messageReceived = (String) message.getPayload();
    System.out.println("Message received: " + messageReceived);
  }

  /**
   * Broadcasts a message to all connected WebSocket sessions.
   *
   * @param message The message to broadcast.
   */
  public void broadcastMessage(String message) {
    sessions.forEach((key, session) -> {
      try {
        if (session.isOpen()) {
          session.sendMessage(new TextMessage(message));
        }
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

  /**
   * Sends a message to a specific user's WebSocket session.
   *
   * @param userId  The ID of the user.
   * @param message The message to send.
   */
  public void sendMessage(String userId, String message) {
    WebSocketSession session = sessions.get(userId);
    if (session == null) {
      return;
    }

    try {
      session.sendMessage(new TextMessage(message));
    } catch (IOException e) {
      // Handle the exception
    }
  }
}
