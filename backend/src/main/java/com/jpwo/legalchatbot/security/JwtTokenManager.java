package com.jpwo.legalchatbot.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenManager implements Serializable {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenManager.class);
    public static final int JWT_TOKEN_VALIDITY = 120*60;         // 120 mins

    @Value("${jwt.secret}")
    private String secret;

    //generate token for required data i.e. user details
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();

        GrantedAuthority role = userDetails.getAuthorities().stream().filter(grantedAuthority -> grantedAuthority.getAuthority().contains("ROLE")).findFirst().orElse(null);
        if (role != null) {
            claims.put("role", role.getAuthority());
        }
        return doGenerateToken(claims, userDetails.getUsername());
    }


    private String doGenerateToken(Map<String, Object> claims, String subject) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder().claims(claims).subject(subject).issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() +  JWT_TOKEN_VALIDITY*1000))
                .signWith(key).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String userName = getUserNameFromToken(token);
        return (!isTokenExpired(token) && userName.equals(userDetails.getUsername()));
    }

    public String getUserNameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }


    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Object getCustomParamFromToken(String token, String param){
        final Claims claims = getAllClaimsFromToken(token);
        return claims.get(param);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
