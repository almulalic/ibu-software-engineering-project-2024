package ba.edu.ibu.eventport.api.rest.configurations;

import org.springframework.context.annotation.Configuration;
import ba.edu.ibu.eventport.api.rest.websockets.MainSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {
  MainSocketHandler mainSocketHandler;

  public WebSocketConfiguration(MainSocketHandler mainSocketHandler) {
    this.mainSocketHandler = mainSocketHandler;
  }

  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(mainSocketHandler, "/websocket").setAllowedOrigins("*");
  }
}
