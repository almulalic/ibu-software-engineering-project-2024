package ba.edu.ibu.eventport.api.core.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
  @Value("${security.jwt.secret}")
  private String jwtSigningKey;

  public String extractId(String token) {
    return extractClaim(token, Claims::getId);
  }

  public String extractUserName(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSigningKey));
  }

  public boolean isTokenValid(String token) {
    return !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
    final Claims claims = extractAllClaims(token);
    return claimsResolvers.apply(claims);
  }

  public Claims extractAllClaims(String token) {
    return Jwts.parser()
             .verifyWith(getSigningKey())
             .build()
             .parseSignedClaims(token)
             .getPayload();
  }
}
