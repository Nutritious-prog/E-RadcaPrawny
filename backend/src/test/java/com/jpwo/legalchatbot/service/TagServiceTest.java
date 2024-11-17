package com.jpwo.legalchatbot.service;
import com.jpwo.legalchatbot.exception.TagCreationException;
import com.jpwo.legalchatbot.model.Tag;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import com.jpwo.legalchatbot.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    private AutoCloseable autoCloseable;
    private TagService tagService;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        tagService = new TagService(tagRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void createTagSuccessfully() throws TagCreationException {
        // given
        String tagName = "tagName";
        Tag expectedTag = Tag.builder()
                .name(tagName)
                .createdAt(new Date())
                .build();
        // when
        when(tagRepository.save(any(Tag.class))).thenReturn(expectedTag);
        // then
        Tag result = tagService.createTag(tagName);

        assertNotNull(result);
        assertEquals(expectedTag.getName(), result.getName());
        assertEquals(expectedTag.getCreatedAt(), result.getCreatedAt());

        verify(tagRepository, times(1)).save(any(Tag.class));

    }

    @Test
    void createTagWithNullNameShouldThrowTagCreationException() {
        // given
        String tagName = null;

        // when then:  TagCreationException
        TagCreationException exception = assertThrows(TagCreationException.class, () -> {
            tagService.createTag(tagName);
        });

        assertEquals("Tag name cannot be null", exception.getMessage());
        verify(tagRepository, never()).save(any(Tag.class));
    }

    @Test
    void createTagUnsuccessfully() {
        // given
        String tagName = "tagName";
        doThrow(new RuntimeException("Database error")).when(tagRepository).save(any(Tag.class));

        // when then: TagCreationException
        assertThrows(TagCreationException.class, () -> {
            tagService.createTag(tagName);
        });

        verify(tagRepository, times(1)).save(any(Tag.class));
    }
}
