package ba.edu.ibu.eventport.auth.rest.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

  @Value("${cors.allowed-origins}")
  private List<String> allowedOrigins;

  @Value("${cors.allowed-methods}")
  private List<String> allowedMethods;

  @Value("${cors.allowed-headers}")
  private List<String> allowedHeaders;

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration corsConfiguration = new CorsConfiguration();
      corsConfiguration.setAllowCredentials(true); // allow credentials
      corsConfiguration.addAllowedOriginPattern("*"); // allow all origins
      corsConfiguration.addAllowedMethod("*"); // allow all HTTP methods
      corsConfiguration.addAllowedHeader("*"); // allow all headers

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfiguration);

      return source;
  }
}