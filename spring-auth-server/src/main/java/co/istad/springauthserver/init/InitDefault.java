package co.istad.springauthserver.init;

import co.istad.springauthserver.domain.Role;
import co.istad.springauthserver.domain.User;
import co.istad.springauthserver.feature.client.JpaRegisteredClientRepository;
import co.istad.springauthserver.feature.role.RoleRepository;
import co.istad.springauthserver.feature.user.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;


@Component
@RequiredArgsConstructor
@Slf4j
public class InitDefault {

    private final RoleRepository repo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JpaRegisteredClientRepository registeredClientRepository;

    @PostConstruct
    public void init() {
        Logger log = LoggerFactory.getLogger(InitDefault.class);
//        Init role
        Role role = Role.builder()
                .uuid(UUID.randomUUID().toString())
                .role("USER")
                .build();
        repo.save(role);
        log.info("INITIALIZED ROLE : {}", role);

//        Init user

        User user = User.builder()
                .uuid(UUID.randomUUID().toString())
                .roles(List.of(role))
                .email("ansoleaphea@gmail.com")
                .password(passwordEncoder.encode("qwer"))
                .username("leaphea")
                .familyName("lim")
                .givenName("leaphea")
                .isEnabled(true)
                .build();
        log.info("INITIALIZED USER : {}", userRepo.save(user));

//        Init client
        TokenSettings tokenSettings = TokenSettings.builder()
                .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED).build();
        if (registeredClientRepository.findByClientId("gateway-client") == null) {
            RegisteredClient defaultClient = RegisteredClient.withId(UUID.randomUUID().toString())
                    .clientId("gateway-client")
                    //SECRET MUST START WITH {noop} TO AVOID ENCODING ERRORS
                    .clientSecret("{noop}gateway-secret")
                    .clientName("Gateway BFF Client")
//                    .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                    .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                    .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                    .redirectUri("http://localhost:8080/login/oauth2/code/gateway-client")
                    .postLogoutRedirectUri("http://localhost:8080/")
                    .scope(OidcScopes.OPENID)
                    .scope(OidcScopes.PROFILE)
//                    .clientIdIssuedAt(Instant.now())
                    .tokenSettings(tokenSettings)
                    .clientSettings(ClientSettings
                            .builder()
                            .requireAuthorizationConsent(false)
                            .requireProofKey(true).build())
                    .build();

            registeredClientRepository.save(defaultClient);
            log.info("INITIALIZED CLIENT : {}", defaultClient);

        }

    }
}
