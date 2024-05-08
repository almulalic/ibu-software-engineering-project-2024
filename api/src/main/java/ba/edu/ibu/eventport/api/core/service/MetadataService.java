package ba.edu.ibu.eventport.api.core.service;

import ba.edu.ibu.eventport.api.core.model.Category;
import ba.edu.ibu.eventport.api.core.model.Country;
import ba.edu.ibu.eventport.api.core.repository.CategoryRepository;
import ba.edu.ibu.eventport.api.core.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for retrieving metadata information such as countries and categories.
 */
@Service
@RequiredArgsConstructor
public class MetadataService {

  private final CountryRepository countryRepository;
  private final CategoryRepository categoryRepository;

  /**
   * Retrieves a list of all countries.
   *
   * @return List of countries.
   */
  public List<Country> getCountries() {
    return countryRepository.findAll();
  }

  /**
   * Retrieves a list of all categories.
   *
   * @return List of categories.
   */
  public List<Category> getCategories() {
    return categoryRepository.findAll();
  }
}
