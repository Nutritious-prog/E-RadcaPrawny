package com.jpwo.legalchatbot.model.security;

import org.springframework.security.core.GrantedAuthority;

public enum SystemRole implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_EDITOR,
    ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
