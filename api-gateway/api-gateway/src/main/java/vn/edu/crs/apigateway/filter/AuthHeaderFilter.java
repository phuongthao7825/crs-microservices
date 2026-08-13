package vn.edu.crs.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class AuthHeaderFilter implements GlobalFilter, Ordered {

    private static final List<String> OPEN_PATHS = List.of(
            "/api/auth/login",
            "/api/public/courses"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // Check path public trong OPEN_PATHS
        boolean isOpen = OPEN_PATHS.stream().anyMatch(path::startsWith);

        // GET /api/courses/** la public (xem mon hoc khong can dang nhap)
        boolean isPublicCourseRead = path.startsWith("/api/courses")
                && "GET".equalsIgnoreCase(request.getMethod().name());

        if (isOpen || isPublicCourseRead) {
            return chain.filter(exchange);
        }

        // Thiếu Authorization header -> Trả về 401 Unauthorized
        if (!request.getHeaders().containsKey("Authorization")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1; // Chạy sớm, trước khi request được định tuyến đi
    }
}