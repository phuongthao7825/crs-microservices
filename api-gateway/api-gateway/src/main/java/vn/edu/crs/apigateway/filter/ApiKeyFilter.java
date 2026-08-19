package vn.edu.crs.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class ApiKeyFilter implements GlobalFilter {

    private static final String VALID_API_KEY = "SECRET_PARTNER_KEY_123";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // Bắt kiểm tra API Key với các request public dành cho Partner
        if (path.startsWith("/api/public/")) {
            String apiKey = exchange.getRequest().getHeaders().getFirst("x-api-key");
            if (apiKey == null) {
                apiKey = exchange.getRequest().getHeaders().getFirst("X-API-KEY");
            }

            if (apiKey == null || !apiKey.equals(VALID_API_KEY)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED); // Trả về 401 nếu thiếu/sai API Key
                return exchange.getResponse().setComplete();
            }
        }

        // Sửa chain.doFilter() thành chain.filter()
        return chain.filter(exchange);
    }
}