package ba.edu.ibu.eventport.api.rest.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Generic Data Transfer Object (DTO) representing a pageable response.
 *
 * @param <T> The type of the elements in the response.
 */
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class PageableResponse<T> {

  /**
   * The page number.
   */
  private int page;

  /**
   * The size of the page.
   */
  private int size;

  /**
   * The sorting criteria.
   */
  private String sort;

  /**
   * The list of results in the page.
   */
  private List<T> results;
}
