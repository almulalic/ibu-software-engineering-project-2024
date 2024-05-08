package ba.edu.ibu.eventport.api.core.repository.generics.filtering.models;

import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a set of filtering criteria to be used in the generic filtering mechanism.
 */
@NoArgsConstructor
public class Filtering {

  private List<Filter> filterList = new ArrayList<>();

  /**
   * Adds a filtering criterion to the list.
   *
   * @param key      The key of the filtering criterion.
   * @param operator The operator of the filtering criterion.
   * @param value    The value of the filtering criterion.
   */
  public void addFilter(String key, Operator operator, Object value) {
    filterList.add(new Filter(key, operator, value));
  }

  /**
   * Chains a filtering criterion to the list and returns the current instance for method chaining.
   *
   * @param key      The key of the filtering criterion.
   * @param operator The operator of the filtering criterion.
   * @param value    The value of the filtering criterion.
   * @return The current instance of {@code Filtering}.
   */
  public Filtering chainFilter(String key, Operator operator, Object value) {
    filterList.add(new Filter(key, operator, value));
    return this;
  }

  /**
   * Gets the list of filtering criteria.
   *
   * @return The list of filtering criteria.
   */
  public List<Filter> getFilterList() {
    return filterList;
  }

  /**
   * Enumeration of supported filtering operators.
   */
  public enum Operator {
    eq("eq"),
    gt("gt"),
    gte("gte"),
    in("in"),
    lt("lt"),
    lte("lte"),
    ne("ne"),
    nin("nin"),
    regex("regex");

    private final String operator;

    Operator(String operator) {
      this.operator = operator;
    }

    /**
     * Returns the string representation of the operator.
     *
     * @return The string representation of the operator.
     */
    @Override
    public String toString() {
      return this.operator;
    }

    /**
     * Converts a string to the corresponding filtering operator.
     *
     * @param operator The string representation of the operator.
     * @return The filtering operator or {@code null} if not found.
     */
    public static Operator fromString(String operator) {
      for (Operator op : Operator.values()) {
        if (op.operator.equalsIgnoreCase(operator)) {
          return op;
        }
      }
      return null;
    }
  }
}
