package ba.edu.ibu.eventport.api.rest.controllers;

import ba.edu.ibu.eventport.api.core.model.Category;
import ba.edu.ibu.eventport.api.core.model.Country;
import ba.edu.ibu.eventport.api.core.service.MetadataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller handling API endpoints related to metadata information such as countries and categories.
 */
@RestController
@RequestMapping("api/metadata")
public class MetadataController {

  private final MetadataService metadataService;

  /**
   * Constructor for MetadataController.
   *
   * @param metadataService MetadataService instance.
   */
  public MetadataController(final MetadataService metadataService) {
    this.metadataService = metadataService;
  }

  /**
   * Retrieve a list of countries.
   *
   * @return ResponseEntity containing a List of Country objects.
   */
  @RequestMapping(method = RequestMethod.GET, path = "country")
  public ResponseEntity<List<Country>> getCountries() {
    return ResponseEntity.ok(metadataService.getCountries());
  }

  /**
   * Retrieve a list of categories.
   *
   * @return ResponseEntity containing a List of Category objects.
   */
  @RequestMapping(method = RequestMethod.GET, path = "category")
  public ResponseEntity<List<Category>> getCategories() {
    return ResponseEntity.ok(metadataService.getCategories());
  }
}
