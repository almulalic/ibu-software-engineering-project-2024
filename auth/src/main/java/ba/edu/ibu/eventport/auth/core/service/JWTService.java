package ba.edu.ibu.eventport.auth.core.service;

import ba.edu.ibu.eventport.auth.core.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
  @Value("${security.jwt.secret}")
  private String jwtSigningKey;
  @Value("${security.jwt.expirationSeconds}")
  private long expirationSeconds;

  public String extractUserName(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSigningKey));
  }

  public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", user.getId());
    claims.put("username", user.getEmail());
    claims.put("firstName", user.getFirstName());
    claims.put("lastName", user.getLastName());
    claims.put("email", user.getEmail());
    claims.put("assignedRoles", user.getAssignedRoles());
    claims.put("authType", user.getAuthType());

    return generateToken(claims, user);
  }

  private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return Jwts.builder()
             .claims(extraClaims)
             .subject(userDetails.getUsername())
             .issuedAt(new Date(System.currentTimeMillis()))
             .expiration(new Date(System.currentTimeMillis() + 1000 * expirationSeconds))
             .signWith(getSigningKey())
             .compact();
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
