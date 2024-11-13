package com.jpwo.legalchatbot.controller;
import com.jpwo.legalchatbot.model.Tag;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import com.jpwo.legalchatbot.repository.TagRepository;
import com.jpwo.legalchatbot.service.TagService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagControllerTest {

    private TagService tagService;

    @Mock
    private TagRepository tagRepository;

    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        tagService = new TagService(tagRepository);
        autoCloseable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void createTagSuccessfully() {
        // given
        String tagName = "tagName";
        Tag expectedTag = Tag.builder()
                .name(tagName)
                .createdAt(new Date())
                .build();
        // when
        when(tagRepository.save(any(Tag.class))).thenReturn(expectedTag);
        System.out.println(expectedTag);
        // then
        Tag result = tagService.createTag(tagName);
        System.out.println(result);
        //assertNotNull(result);
        assertEquals(expectedTag.getName(), result.getName());
        assertEquals(expectedTag.getCreatedAt(), result.getCreatedAt());

        verify(tagRepository, times(1)).save(any(Tag.class));

    }

}
