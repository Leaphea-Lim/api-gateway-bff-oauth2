package istad.co.example.api_gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping("/products")
    public Mono<String> productFallback() {
        return Mono.just("Product service is unavailable");
    }

    @GetMapping("/categories")
    public Mono<String> categoryFallback() {
        return Mono.just("Category service is unavailable");
    }
}
