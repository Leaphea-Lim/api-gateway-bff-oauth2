package istad.co.example.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.authentication.logout.RedirectServerLogoutSuccessHandler;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        // 1. Next.js Static Resources (Public)
                        .pathMatchers("/", "/_next/**", "/static/**", "/dashboard/**", "/favicon.ico", "/__nextjs_original-stack-frames/**").permitAll()
                        // 2. Auth Endpoints (Public)
                        .pathMatchers("/login/**", "/oauth2/**").permitAll()

                        // 3. PUBLIC BROWSING (Requirement fix!)
                        // Allow anyone to GET products and categories without logging in
                        .pathMatchers(HttpMethod.GET, "/api/products/**", "/api/categories/**").permitAll()

                        // 4. PROTECT EVERYTHING ELSE (Add to Cart, Delete, etc.)
                        .anyExchange().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .authenticationSuccessHandler(new RedirectServerAuthenticationSuccessHandler("/dashboard"))
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(new RedirectServerLogoutSuccessHandler())
                );

        return http.build();
    }

}