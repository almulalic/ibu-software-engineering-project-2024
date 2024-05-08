package ba.edu.ibu.eventport.api.core.repository;

import ba.edu.ibu.eventport.api.core.model.Country;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Repository interface for managing {@link Country} entities in the database.
 */
public interface CountryRepository extends MongoRepository<Country, String> {

  /**
   * Retrieves a country by ISO 2 code and containing the specified city.
   *
   * @param countryIso2Code The ISO 2 code of the country.
   * @param city            The city to check for within the country.
   * @return An {@link Optional} containing the retrieved {@link Country}, or empty if not found.
   */
  Optional<Country> findCountryByIso2CodeAndCitiesContaining(String countryIso2Code, String city);
}
