package istad.co.example.category_service.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .httpBasic(httpBasic -> httpBasic.disable())  // ← Explicitly disable basic auth prompt
                .formLogin(form -> form.disable())             // Disable form login (not needed here)
                .csrf(csrf -> csrf.disable())                  // Disable CSRF (safe for REST APIs; enable later if needed)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                        .requestMatchers("/actuator/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults()));

        return httpSecurity.build();
    }
}
