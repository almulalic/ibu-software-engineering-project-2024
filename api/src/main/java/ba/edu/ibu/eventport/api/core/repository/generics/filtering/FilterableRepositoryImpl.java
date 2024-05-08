package ba.edu.ibu.eventport.api.core.repository.generics.filtering;

import ba.edu.ibu.eventport.api.core.repository.generics.filtering.models.Filtering;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Implementation of the {@link FilterableRepository} interface providing methods for filtering entities.
 *
 * @param <T> The type of entities managed by the repository.
 */
@Repository
public class FilterableRepositoryImpl<T> implements FilterableRepository<T> {

  private final MongoTemplate mongoTemplate;

  /**
   * Constructor for creating an instance of {@code FilterableRepositoryImpl}.
   *
   * @param mongoTemplate The {@link MongoTemplate} used for MongoDB interactions.
   */
  public FilterableRepositoryImpl(MongoTemplate mongoTemplate) {
    this.mongoTemplate = mongoTemplate;
  }

  /**
   * Retrieves a pageable list of entities based on the provided filtering criteria and pagination information.
   *
   * @param typeParameterClass The class of the entities.
   * @param filtering          The filtering criteria.
   * @param pageable           The pageable information for pagination.
   * @return A {@link Page} of filtered entities.
   */
  @Override
  public Page<T> findAllWithFilter(Class<T> typeParameterClass, Filtering filtering, Pageable pageable) {
    Query query = constructQueryFromFiltering(filtering).with(pageable);
    List<T> ts = mongoTemplate.find(query, typeParameterClass);
    return PageableExecutionUtils.getPage(ts, pageable, () -> mongoTemplate.count(query, typeParameterClass));
  }

  /**
   * Retrieves all possible values for a specific filter key based on the provided filtering criteria.
   *
   * @param typeParameterClass The class of the entities.
   * @param filtering          The filtering criteria.
   * @param filterKey          The key for which possible values are requested.
   * @return A list of possible values for the specified filter key.
   */
  @Override
  public List<Object> getAllPossibleValuesForFilter(
    Class<T> typeParameterClass,
    Filtering filtering,
    String filterKey
  ) {
    Query query = constructQueryFromFiltering(filtering);
    return mongoTemplate.query(typeParameterClass).distinct(filterKey).matching(query).all();
  }
}
