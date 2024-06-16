package ba.edu.ibu.eventport.api.core.repository.impl;

import ba.edu.ibu.eventport.api.core.model.event.Event;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Custom implementation of a filterable event repository.
 * <p>
 * This repository allows filtering events based on various criteria such as search text, countries, cities,
 * categories, start date, and end date.
 */
@Repository
public class FilterableEventRepositoryImpl {

    private final MongoTemplate mongoTemplate;

    /**
     * Constructs a new {@code FilterableEventRepositoryImpl} with the provided {@link MongoTemplate}.
     *
     * @param mongoTemplate The MongoTemplate to be used for database operations.
     */
    public FilterableEventRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Sort generateSort(Pageable pageable) {
        Sort mongoSort = Sort.unsorted();

        if (pageable != null && pageable.getSort().isSorted()) {
            for (Sort.Order order : pageable.getSort()) {
                String property = order.getProperty();
                Sort.Direction direction = order.getDirection();

                switch (property) {
                    case "price":
                        if (direction == Sort.Direction.ASC) {
                            mongoSort = mongoSort.and(Sort.by(Sort.Order.asc("ticketTypes.price")));
                        } else {
                            mongoSort = mongoSort.and(Sort.by(Sort.Order.desc("ticketTypes.price")));
                        }
                        break;
                    case "likedBy":
                        if (direction == Sort.Direction.ASC) {
                            mongoSort = mongoSort.and(Sort.by(Sort.Order.asc("likedBy")));
                        } else {
                            mongoSort = mongoSort.and(Sort.by(Sort.Order.desc("likedBy")));
                        }
                        break;
                    default:
                        throw new IllegalArgumentException("Unsupported sorting property: " + property);
                }
            }
        }

        return mongoSort;
    }

    /**
     * Retrieves a pageable list of events based on various filtering criteria.
     *
     * @param searchText The text to search for in event-related fields.
     * @param countries  The list of countries to filter events by.
     * @param cities     The list of cities to filter events by.
     * @param categories The list of categories to filter events by.
     * @param startDate  The start date to filter events by.
     * @param endDate    The end date to filter events by.
     * @param pageable   The pageable information for pagination.
     * @return A {@link Page} of filtered events.
     */
    public Page<Event> findAll(
      String searchText,
      List<String> countries,
      List<String> cities,
      List<String> categories,
      String startDate,
      String endDate,
      Pageable pageable
    ) {
        Query query = new Query();

        if (searchText != null && !searchText.isEmpty()) {
            Criteria searchTextCriteria = new Criteria().orOperator(
              Criteria.where("name").regex(searchText, "i"),
              Criteria.where("description").regex(searchText, "i"),
              Criteria.where("geoLocation.iso2Code").regex(searchText, "i"),
              Criteria.where("geoLocation.country").regex(searchText, "i"),
              Criteria.where("geoLocation.city").regex(searchText, "i"),
              Criteria.where("venue").regex(searchText, "i")
            );

            query.addCriteria(searchTextCriteria);
        }

        if (countries != null && countries.size() > 0) {
            query.addCriteria(Criteria.where("geoLocation.iso2Code").in(countries));
        }

        if (cities != null && cities.size() > 0) {
            query.addCriteria(Criteria.where("geoLocation.city").in(cities));
        }

        if (categories != null && categories.size() > 0) {
            query.addCriteria(Criteria.where("categories").in(categories));
        }

        if (startDate.length() > 0 && endDate.length() > 0) {
            query.addCriteria(
              Criteria.where("dateTime")
                .gte(LocalDateTime.parse(startDate, DateTimeFormatter.ISO_DATE_TIME))
                .lte(LocalDateTime.parse(endDate, DateTimeFormatter.ISO_DATE_TIME))
            );
        } else if (startDate.length() > 0) {
            query.addCriteria(Criteria.where("dateTime").gte(startDate));
        }

        if (!pageable.getSort().isEmpty()) {
            query.with(this.generateSort(pageable));
        }

        long totalCount = mongoTemplate.count(query, Event.class);

        query.with(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()));

        List<Event> events = mongoTemplate.find(query, Event.class);

        return new PageImpl<>(events, pageable, totalCount);
    }
}
