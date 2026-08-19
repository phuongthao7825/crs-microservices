package vn.edu.crs.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                // Tắt hoàn toàn CSRF trên Gateway
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                // Cho phép tất cả các route đi qua để Custom Filter (ApiKeyFilter, AuthHeaderFilter) làm việc
                .authorizeExchange(exchanges -> exchanges
                        .anyExchange().permitAll()
                );
        return http.build();
    }
}