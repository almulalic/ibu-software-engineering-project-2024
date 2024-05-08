package ba.edu.ibu.eventport.api.core.repository.generics.filtering.models;

/**
 * Represents a filtering criterion to be used in the generic filtering mechanism.
 */
public class Filter {

  private final String key;
  private final Filtering.Operator operator;
  private final Object value;

  /**
   * Constructs a new {@code Filter} with the specified key, operator, and value.
   *
   * @param key      The key of the filtering criterion.
   * @param operator The operator of the filtering criterion.
   * @param value    The value of the filtering criterion.
   */
  public Filter(String key, Filtering.Operator operator, Object value) {
    this.key = key;
    this.operator = operator;
    this.value = value;
  }

  /**
   * Gets the key of the filtering criterion.
   *
   * @return The key of the filtering criterion.
   */
  public String getKey() {
    return key;
  }

  /**
   * Gets the operator of the filtering criterion.
   *
   * @return The operator of the filtering criterion.
   */
  public Filtering.Operator getOperator() {
    return operator;
  }

  /**
   * Gets the value of the filtering criterion.
   *
   * @return The value of the filtering criterion.
   */
  public Object getValue() {
    return value;
  }

  /**
   * Returns a string representation of the filtering criterion.
   *
   * @return A string representation of the filtering criterion.
   */
  @Override
  public String toString() {
    return getKey() + getOperator() + getValue();
  }
}
