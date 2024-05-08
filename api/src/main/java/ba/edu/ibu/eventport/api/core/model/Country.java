package ba.edu.ibu.eventport.api.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Model class representing a country.
 * <p>
 * This class includes fields for the ISO 2 code, name, and an array of cities in the country.
 */
@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder(builderMethodName = "Builder", builderClassName = "Builder", setterPrefix = "with")
public class Country {

  /**
   * The ISO 2 code representing the country.
   */
  public String iso2Code;

  /**
   * The name of the country.
   */
  public String name;

  /**
   * An array of cities in the country.
   */
  public List<String> cities;
}
