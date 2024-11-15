package com.jpwo.legalchatbot.controller;

import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.model.dto.TagDTO;
import com.jpwo.legalchatbot.service.TagService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TagControllerTest {

    @Mock
    private TagService tagService;

    @InjectMocks
    private TagController tagController;

    @BeforeEach
    void setUp() {
        reset(tagService);
    }

    @Test
    void getTags_ShouldReturnAllTags() {
        // given
        Tag tag1 = new Tag(1L, "Tag 1", null, new Date(), new Date());
        Tag tag2 = new Tag(2L, "Tag 2", null, new Date(), new Date());
        List<Tag> tags = Arrays.asList(tag1, tag2);

        when(tagService.getTags()).thenReturn(tags);

        // when
        ResponseEntity<ApiResponse<List<Tag>>> response = tagController.getTags();

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Tags found successfully", response.getBody().getMessage());
        assertEquals(2, response.getBody().getResponse().size());
        assertEquals("Tag 1", response.getBody().getResponse().get(0).getName());

        verify(tagService).getTags();
    }

    @Test
    void updateTag_ShouldUpdateTagSuccessfully() throws DbObjectNotFoundException {
        // given
        Long tagId = 1L;
        TagDTO tagDTO = new TagDTO();
        tagDTO.setName("Updated Tag");

        Tag existingTag = new Tag(tagId, "Old Tag", null, new Date(), new Date());

        // Create updated tag by adding 10 days to the current date
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date()); // Set the current time
        calendar.add(Calendar.DATE, 10); // Add 10 days

        Date newModifiedAt = calendar.getTime(); // Get the new date after adding 10 days
        Tag updatedTag = new Tag(tagId, "Updated Tag", null, existingTag.getCreatedAt(), newModifiedAt);

        when(tagService.getTagById(tagId)).thenReturn(Optional.of(existingTag));
        when(tagService.saveTag(any(Tag.class))).thenReturn(updatedTag);

        // when
        ResponseEntity<ApiResponse<Tag>> response = tagController.updateTag(tagId, tagDTO);

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Tag updated successfully", response.getBody().getMessage());
        assertEquals("Updated Tag", response.getBody().getResponse().getName());

        ArgumentCaptor<Tag> tagCaptor = ArgumentCaptor.forClass(Tag.class);
        verify(tagService).saveTag(tagCaptor.capture());
        Tag savedTag = tagCaptor.getValue();

        assertEquals("Updated Tag", savedTag.getName());
        assertNotNull(savedTag.getModifiedAt());
        assertTrue(response.getBody().getResponse().getModifiedAt().after(existingTag.getModifiedAt()));
    }

    @Test
    void updateTag_ShouldThrowDbObjectNotFoundException_WhenTagNotFound() {
        // given
        Long tagId = 1L;
        TagDTO tagDTO = new TagDTO();
        tagDTO.setName("Updated Tag");

        when(tagService.getTagById(tagId)).thenReturn(Optional.empty());

        // when
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            tagController.updateTag(tagId, tagDTO);
        });

        // then
        assertEquals("Tag not found", exception.getMessage());
        verify(tagService).getTagById(tagId);
        verify(tagService, never()).saveTag(any(Tag.class));
    }
}
