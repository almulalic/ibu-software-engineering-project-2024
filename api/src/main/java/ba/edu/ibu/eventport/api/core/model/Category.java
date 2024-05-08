package ba.edu.ibu.eventport.api.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model class representing a category.
 * <p>
 * This class includes fields for the unique identifier and name of the category.
 */
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class Category {

  /**
   * The unique identifier for the category.
   */
  @Id
  public ObjectId id;

  /**
   * The name of the category.
   */
  public String name;
}
