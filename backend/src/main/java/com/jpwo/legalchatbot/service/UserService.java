package com.jpwo.legalchatbot.service;

import com.jpwo.legalchatbot.model.security.User;
import com.jpwo.legalchatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void saveUser(final User user) {
        userRepository.save(user);
    }

}
