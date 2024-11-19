package com.jpwo.legalchatbot.service;

import com.jpwo.legalchatbot.model.security.User;
import com.jpwo.legalchatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;

    @Autowired
    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean existsByEmail(final String email) {
        return userRepository.existsByEmail(email);
    }

    public User saveUser(final User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(final String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(final Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(final User user) {
        userRepository.delete(user);
    }

}
