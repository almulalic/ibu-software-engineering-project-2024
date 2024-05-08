package ba.edu.ibu.eventport.api.core.repository;

import ba.edu.ibu.eventport.api.core.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing {@link Category} entities in the database.
 */
public interface CategoryRepository extends MongoRepository<Category, String> {

  /**
   * Retrieves the first category with a name not in the specified list.
   *
   * @param categories The array of category names to exclude.
   * @return An {@link Optional} containing the retrieved {@link Category}, or empty if not found.
   */
  Optional<Category> findFirstByNameNotIn(String[] categories);

  /**
   * Retrieves the first category with the specified name.
   *
   * @param categories The name of the category to retrieve.
   * @return An {@link Optional} containing the retrieved {@link Category}, or empty if not found.
   */
  Optional<Category> findFirstByName(String categories);
}
