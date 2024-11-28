package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.exception.UserNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.dto.LoginRequestDTO;
import com.jpwo.legalchatbot.model.dto.AuthResponseDTO;
import com.jpwo.legalchatbot.model.dto.UserDTO;
import com.jpwo.legalchatbot.model.security.SystemRole;
import com.jpwo.legalchatbot.model.security.User;
import com.jpwo.legalchatbot.security.Encryptor;
import com.jpwo.legalchatbot.security.JwtTokenManager;
import com.jpwo.legalchatbot.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping(path = "api/v1/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtTokenManager jwtTokenManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final Encryptor encryptor;

    AuthController(final AuthenticationManager authenticationManager,
                   final UserDetailsService userDetailsService,
                   JwtTokenManager jwtTokenManager,
                   UserService userService,
                   PasswordEncoder passwordEncoder,
                   Encryptor encryptor) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenManager = jwtTokenManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.encryptor = encryptor;
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> createAuthenticationToken(HttpServletRequest request, @RequestBody LoginRequestDTO loginRequest) throws Exception {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "Invalid input data"), HttpStatus.BAD_REQUEST);
        }

        String password = loginRequest.getPassword();
        try {
            authenticate(loginRequest.getEmail(), password);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "INVALID_CREDENTIALS"), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "Authentication failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        final User user = (User) userDetailsService
                .loadUserByUsername(loginRequest.getEmail());
        final String token = jwtTokenManager.generateToken(user);
        logger.warn("PLAIN TOKEN: {}", token);
        String encryptedToken = encryptor.encrypt(token);
        logger.info("Encrypted token: {}", encryptedToken);
        AuthResponseDTO loginResponse = AuthResponseDTO.builder()
                .email(user.getEmail())
                .role(user.getRole().name())
                .token(encryptedToken).build();
        ApiResponse<AuthResponseDTO> apiResponse = new ApiResponse<>(true, loginResponse, "Auth success");
        return ResponseEntity.ok(apiResponse);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            logger.error("Disabled User. Message: {}", e.getMessage());
            throw new DisabledException("User account disabled", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        }
    }


    @PostMapping(value = "/register")
    public ResponseEntity<ApiResponse<?>> registerUser(HttpServletRequest request, @RequestBody UserDTO userDTO) {

        // Validate input
        if (userDTO.getEmail() == null || userDTO.getPassword() == null) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "Invalid input data"), HttpStatus.BAD_REQUEST);
        }

        try {
            // Check if the user already exists
            if (userService.existsByEmail(userDTO.getEmail())) {
                return new ResponseEntity<>(new ApiResponse<>(false, null, "Email already exists"), HttpStatus.BAD_REQUEST);
            }

            // Create new User entity
            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setEnabled(true);
            SystemRole systemRole = SystemRole.ROLE_EDITOR;
            user.setRole(systemRole);

            // Save the user

            user =  userService.saveUser(user);
            final String token = jwtTokenManager.generateToken(user);
            String encryptedToken = encryptor.encrypt(token);
            AuthResponseDTO registerResponse = AuthResponseDTO.builder()
                    .email(user.getEmail())
                    .role(user.getRole().name())
                    .token(encryptedToken).build();
            ApiResponse<AuthResponseDTO> apiResponse = new ApiResponse<>(true, registerResponse, "User registered successfully");
            return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse<>(false, null, "Error creating user"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<ApiResponse<?>> deleteUser(HttpServletRequest request, @PathVariable("id") Long id) throws UserNotFoundException {

        User toDelete = userService.findById(id).orElseThrow(()-> new UserNotFoundException("User not found"));
        userService.deleteUser(toDelete);
        ApiResponse<?> apiResponse = new ApiResponse<>(true, null, "User deleted successfully");
        return ResponseEntity.ok(apiResponse);


    }

}
