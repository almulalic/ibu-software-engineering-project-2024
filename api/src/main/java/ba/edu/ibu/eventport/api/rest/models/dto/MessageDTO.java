package ba.edu.ibu.eventport.api.rest.models.dto;

/**
 * Data Transfer Object (DTO) representing a message.
 */
public class MessageDTO {

  /**
   * The content of the message.
   */
  private String message;

  /**
   * Default constructor for MessageDTO.
   */
  public MessageDTO() {
  }

  /**
   * Constructor for creating MessageDTO with a specified message.
   *
   * @param message The content of the message.
   */
  public MessageDTO(String message) {
    this.message = message;
  }

  /**
   * Get the content of the message.
   *
   * @return The content of the message.
   */
  public String getMessage() {
    return message;
  }

  /**
   * Set the content of the message.
   *
   * @param message The content of the message.
   */
  public void setMessage(String message) {
    this.message = message;
  }
}
