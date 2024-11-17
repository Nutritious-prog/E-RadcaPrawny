package com.jpwo.legalchatbot.model;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
class TagTest {

    @PersistenceContext
    private EntityManager entityManager;


    @Test
    void testTagNameCannotBeNull() {
        // Given
        Tag tagWithoutName = new Tag();

        // When
        assertThrows(org.hibernate.exception.ConstraintViolationException.class, () -> {
            entityManager.persist(tagWithoutName);
            entityManager.flush();
        });
    }

}