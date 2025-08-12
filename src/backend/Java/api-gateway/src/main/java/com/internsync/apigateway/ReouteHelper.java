package com.internsync.apigateway;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class ReouteHelper {
	
	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}

		
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("authservice",r->r.path("/api/auth/**")
					//.uri("http://localhost:8081"))
					  .uri("lb://auth-service"))
				.route("orgservice",r->r.path("/api/org/**")
					//.uri("http://localhost:8082"))
					   .uri("lb://org-service"))
				.route("orgservice",r->r.path("/api/org/internship/**")
					//.uri("http://localhost:8082"))
					  .uri("lb://org-service"))
				.route("orgservice",r->r.path("/api/org/interviews/**")
					//.uri("http://localhost:8082"))
					  .uri("lb://org-service")) 
				.route("orgservice",r->r.path("/api/org/applications/**")
						//.uri("http://localhost:8082"))
						  .uri("lb://org-service"))
				.route("studentservice",r->r.path("/students/**")
					//.uri("http://localhost:8083"))
					  .uri("lb://student-service"))
				.route("studentservice",r->r.path("/applications/**")
					//.uri("http://localhost:8083"))
					  .uri("lb://student-service"))
				.route("studentservice",r->r.path("/documents/**")
					//.uri("http://localhost:8083")) 
					  .uri("lb://student-service"))
				.route("studentservice",r->r.path("/educations/**")
					//.uri("http://localhost:8083"))
					  .uri("lb://student-service"))
				.route("studentservice",r->r.path("/skills/**")
					//.uri("http://localhost:8083"))
					  .uri("lb://student-service"))
				.route("admin-Service",r->r.path("/api/admin/**")
						 //.uri("http://localhost:5000"))
						 .uri("lb://adminService"))
				.build();
		
	}

}
