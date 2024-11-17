package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.exception.UserNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.dto.LoginRequestDTO;
import com.jpwo.legalchatbot.model.dto.LoginResponseDTO;
import com.jpwo.legalchatbot.model.dto.UserDTO;
import com.jpwo.legalchatbot.model.security.SystemRole;
import com.jpwo.legalchatbot.model.security.User;
import com.jpwo.legalchatbot.security.Encryptor;
import com.jpwo.legalchatbot.security.JwtTokenManager;
import com.jpwo.legalchatbot.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private JwtTokenManager jwtTokenManager;

    @Mock
    private Encryptor encryptor;

    private AuthController authController;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        authController = new AuthController(authenticationManager, userDetailsService, jwtTokenManager, userService, passwordEncoder, encryptor);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void registerUser_SuccessfullyCreatesUser_ReturnsCreated() {
        // Given
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("newuser@example.com");
        userDTO.setPassword("password123");

        // Setup mocks
        when(userService.existsByEmail(userDTO.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(userDTO.getPassword())).thenReturn("encodedPassword");

        // When
        ResponseEntity<ApiResponse<?>> response = authController.registerUser(null, userDTO);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().getMessage()).isEqualTo("User created successfully");
    }


    @Test
    void registerUser_WithInvalidData_ReturnsBadRequest() {
        // Given
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(null);
        userDTO.setPassword("password123");

        // When
        ResponseEntity<ApiResponse<?>> response = authController.registerUser(null, userDTO);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getMessage()).isEqualTo("Invalid input data");
    }

    @Test
    void registerUser_WithExistingEmail_ReturnsBadRequest() {
        // Given
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("existinguser@example.com");
        userDTO.setPassword("validPassword123");

        when(userService.existsByEmail(userDTO.getEmail())).thenReturn(true);

        // When
        ResponseEntity<ApiResponse<?>> response = authController.registerUser(null, userDTO);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getMessage()).isEqualTo("Email already exists");
    }

    @Test
    void createAuthenticationToken_WithValidCredentials_ReturnsOk() throws Exception {
        // Given
        String email = "validuser@example.com";
        String password = "validPassword123";

        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        User user = new User();
        user.setEmail(email);
        user.setRole(SystemRole.ROLE_USER);

        // Setup mocks
        when(userDetailsService.loadUserByUsername(email)).thenReturn(user);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(jwtTokenManager.generateToken(user)).thenReturn("valid_token");
        when(encryptor.encrypt("valid_token")).thenReturn("encrypted_token");

        // When
        ResponseEntity<ApiResponse<LoginResponseDTO>> response = authController.createAuthenticationToken(null, loginRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getMessage()).isEqualTo("Auth success");
    }

    @Test
    void createAuthenticationToken_WithValidEmailButInvalidPassword_ReturnsUnauthorized() throws Exception {
        // Given
        String email = "validuser@example.com";
        String password = "wrongPassword";

        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        // Setup mocks
        doThrow(new BadCredentialsException("INVALID_CREDENTIALS")).when(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));

        // When
        ResponseEntity<ApiResponse<LoginResponseDTO>> response = authController.createAuthenticationToken(null, loginRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(response.getBody().getMessage()).isEqualTo("INVALID_CREDENTIALS");

        // Verify that authenticate() was called
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void createAuthenticationToken_WithEmptyCredentials_ReturnsBadRequest() throws Exception {
        // Given
        String email = "";
        String password = "";

        LoginRequestDTO loginRequest = new LoginRequestDTO();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        // When
        ResponseEntity<ApiResponse<LoginResponseDTO>> response = authController.createAuthenticationToken(null, loginRequest);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().getMessage()).isEqualTo("Invalid input data");
    }

    @Test
    void deleteUser_SuccessfullyDeletesUser_ReturnsOk() throws Exception {
        // Given
        Long userId = 1L;

        // Tworzymy użytkownika, który ma zostać usunięty
        User existingUser = new User();
        existingUser.setId(userId);
        existingUser.setEmail("user@example.com");
        existingUser.setEnabled(true);
        existingUser.setRole(SystemRole.ROLE_USER);

        // Ustawiamy mocki
        when(userService.findById(userId)).thenReturn(java.util.Optional.of(existingUser));

        // When
        ResponseEntity<ApiResponse<?>> response = authController.deleteUser(null, userId);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getMessage()).isEqualTo("User deleted successfully");

        // Weryfikujemy, że userService.deleteUser() zostało wywołane z odpowiednim użytkownikiem
        verify(userService, times(1)).deleteUser(existingUser);
    }

    @Test
    void deleteUser_UserNotFound_ThrowsUserNotFoundException() {
        // Given
        Long userId = 1L;

        // Mockowanie, że użytkownik nie istnieje
        when(userService.findById(userId)).thenReturn(java.util.Optional.empty());

        // When - sprawdzamy, czy wyjątek jest rzucany
        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            authController.deleteUser(null, userId);
        });

        // Then - upewniamy się, że wyjątek zawiera odpowiednią wiadomość
        assertThat(exception.getMessage()).isEqualTo("User not found");

        // Weryfikacja, że userService.deleteUser() nie zostało wywołane
        verify(userService, times(0)).deleteUser(any());
    }

}