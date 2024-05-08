package ba.edu.ibu.eventport.api.core.model.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model class representing geographical location information.
 * <p>
 * This class includes fields for ISO 2 code, country name, and city name.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeoLocation {

  /**
   * The ISO 2 code representing the country.
   */
  private String iso2Code;

  /**
   * The name of the country.
   */
  private String country;

  /**
   * The name of the city.
   */
  private String city;
}
