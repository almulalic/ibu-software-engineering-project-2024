package ba.edu.ibu.eventport.api.core.repository.generics.filtering;

import ba.edu.ibu.eventport.api.core.repository.generics.filtering.models.Filter;
import ba.edu.ibu.eventport.api.core.repository.generics.filtering.models.Filtering;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

/**
 * A generic repository interface providing methods for filtering entities.
 *
 * @param <T> The type of entities managed by the repository.
 */
public interface FilterableRepository<T> {

  /**
   * Retrieves a pageable list of entities based on the provided filtering criteria and pagination information.
   *
   * @param typeParameterClass The class of the entities.
   * @param filtering          The filtering criteria.
   * @param pageable           The pageable information for pagination.
   * @return A {@link Page} of filtered entities.
   */
  Page<T> findAllWithFilter(Class<T> typeParameterClass, Filtering filtering, Pageable pageable);

  /**
   * Retrieves all possible values for a specific filter key based on the provided filtering criteria.
   *
   * @param typeParameterClass The class of the entities.
   * @param filtering          The filtering criteria.
   * @param filterKey          The key for which possible values are requested.
   * @return A list of possible values for the specified filter key.
   */
  List<Object> getAllPossibleValuesForFilter(Class<T> typeParameterClass, Filtering filtering, String filterKey);

  /**
   * Constructs a MongoDB query from the given filtering criteria.
   *
   * @param filtering The filtering criteria.
   * @return A {@link Query} representing the filtering criteria.
   */
  default Query constructQueryFromFiltering(Filtering filtering) {
    Query query = new Query();
    for (Filter filter : filtering.getFilterList()) {
      switch (filter.getOperator()) {
        // Handle each filtering operator and construct the corresponding Criteria
        // ...
        default:
          throw new IllegalArgumentException("Unknown operator: " + filter.getOperator());
      }
    }
    return query;
  }
}
