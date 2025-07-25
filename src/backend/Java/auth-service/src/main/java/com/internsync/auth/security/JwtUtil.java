package com.internsync.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret; // Base64 encoded 64-byte key

	@Value("${jwt.expiration}")
	private long expiration; // in milliseconds

	private SecretKey secretKey;

	@PostConstruct
	public void init() {
		// Decode base64-encoded secret and validate key length
		byte[] keyBytes = Base64.getDecoder().decode(secret);

		if (keyBytes.length < 64) {
			throw new IllegalArgumentException(
					"JWT secret key is too short for HS512. Must be at least 512 bits (64 bytes)");
		}

		this.secretKey = Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(String username) {
		return Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(secretKey, SignatureAlgorithm.HS512).compact();
	}

	public String extractUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		} catch (Exception e) {
			// Optionally log or print the exception here
			return false;
		}
	}
}
