package com.jpwo.legalchatbot.service;

import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.exception.TagCreationException;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.LegalActTag;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.model.dto.TagDTO;
import com.jpwo.legalchatbot.repository.LegalActRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class LegalActServiceTest {
    @Mock
    private LegalActRepository legalActRepository;

    @Mock
    private TagService tagService;

    @InjectMocks
    private LegalActService legalActService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        legalActService = new LegalActService(legalActRepository, tagService);
    }

    @Test
    void addExistingTagToLegalAct_Successfully() throws DbObjectNotFoundException, TagCreationException {
        //given
        Long legalActId = 1L;
        TagDTO tagDTO = new TagDTO("firstTag");

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        Tag tag = new Tag();
        tag.setName("firstTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(tagService.getTag("firstTag")).thenReturn(Optional.of(tag));
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.addTagToLegalAct(legalActId, tagDTO);

        assertEquals(1, updatedLegalAct.getLegalActTags().size());
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("firstTag")));
    }

    @Test
    void addTagToNonExistingLegalAct_ShouldThrowDbObjectNotFoundException() {
        //given
        Long legalActId = 1L;
        TagDTO tagDTO = new TagDTO("firstTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.empty());

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.addTagToLegalAct(legalActId, tagDTO);
        });
        assertEquals("Legal act not found", exception.getMessage());
    }

    @Test
    void addNonExistingTagToLegalAct_ShouldCreateNewTagIfNotExist() throws DbObjectNotFoundException, TagCreationException {
        //given
        Long legalActId = 1L;
        TagDTO tagDTO = new TagDTO("firstTag");

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        Tag newTag = new Tag();
        newTag.setName("firstTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(tagService.getTag("firstTag")).thenReturn(Optional.empty());
        when(tagService.createTag("firstTag")).thenReturn(newTag);
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.addTagToLegalAct(legalActId, tagDTO);

        assertEquals(1, updatedLegalAct.getLegalActTags().size());
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("firstTag")));
    }

    @Test
    void removeTagFromLegalAct_ShouldRemoveTagSuccessfully() throws DbObjectNotFoundException {
        //given
        Long legalActId = 1L;
        String tagName = "firstTag";

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);

        Tag tag = new Tag();
        tag.setName(tagName);

        LegalActTag legalActTag = new LegalActTag(legalAct, tag, new Date());


        Set<LegalActTag> legalActTags = new HashSet<>();
        legalActTags.add(legalActTag);
        legalAct.setLegalActTags(legalActTags);

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.removeTagFromLegalAct(legalActId, tagName);

        assertEquals(0, updatedLegalAct.getLegalActTags().size());
    }

    @Test
    void removeTagFromLegalAct_ShouldThrowDbObjectNotFoundException_WhenLegalActNotFound() {
        //given
        Long legalActId = 1L;
        String tagName = "firstTag";

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.empty());

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.removeTagFromLegalAct(legalActId, tagName);
        });
        assertEquals("Legal act not found", exception.getMessage());
    }

    @Test
    void removeTagFromLegalAct_ShouldThrowDbObjectNotFoundException_WhenTagNotFound() {
        //given
        Long legalActId = 1L;
        String tagName = "firstTag";

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.removeTagFromLegalAct(legalActId, tagName);
        });
        assertEquals("Legal Act Tag not found", exception.getMessage());
    }

    @Test
    void addMultipleTagsToLegalAct_ShouldAddNewTagsSuccessfully() throws DbObjectNotFoundException, TagCreationException {
        //given
        Long legalActId = 1L;
        List<TagDTO> tags = Arrays.asList(new TagDTO("firstTag"), new TagDTO("secondTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        Tag tag1 = new Tag();
        tag1.setName("firstTag");
        Tag tag2 = new Tag();
        tag2.setName("secondTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(tagService.getTag("firstTag")).thenReturn(Optional.of(tag1));
        when(tagService.getTag("secondTag")).thenReturn(Optional.of(tag2));
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.addMultipleTagsToLegalAct(legalActId, tags);

        assertEquals(2, updatedLegalAct.getLegalActTags().size());
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("firstTag")));
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("secondTag")));
    }

    @Test
    void addMultipleTagsToLegalAct_ShouldSkipExistingTags() throws DbObjectNotFoundException, TagCreationException {
        //given
        Long legalActId = 1L;
        List<TagDTO> tags = Arrays.asList(new TagDTO("firstTag"), new TagDTO("secondTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);

        Tag existingTag = new Tag();
        existingTag.setName("firstTag");

        LegalActTag existingLegalActTag = new LegalActTag(legalAct, existingTag, new Date());
        Set<LegalActTag> existingTags = new HashSet<>();
        existingTags.add(existingLegalActTag);
        legalAct.setLegalActTags(existingTags);

        Tag tag2 = new Tag();
        tag2.setName("secondTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(tagService.getTag("firstTag")).thenReturn(Optional.of(existingTag));
        when(tagService.getTag("secondTag")).thenReturn(Optional.of(tag2));
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.addMultipleTagsToLegalAct(legalActId, tags);

        assertEquals(2, updatedLegalAct.getLegalActTags().size());
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("firstTag")));
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("secondTag")));
    }

    @Test
    void addMultipleTagsToLegalAct_ShouldCreateNewTagsIfNotExist() throws DbObjectNotFoundException, TagCreationException {
        //given
        Long legalActId = 1L;
        List<TagDTO> tags = Arrays.asList(new TagDTO("firstTag"), new TagDTO("secondTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        Tag newTag1 = new Tag();
        newTag1.setName("firstTag");
        Tag newTag2 = new Tag();
        newTag2.setName("secondTag");

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(tagService.getTag("firstTag")).thenReturn(Optional.empty());
        when(tagService.getTag("secondTag")).thenReturn(Optional.empty());
        when(tagService.createTag("firstTag")).thenReturn(newTag1);
        when(tagService.createTag("secondTag")).thenReturn(newTag2);
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.addMultipleTagsToLegalAct(legalActId, tags);

        assertEquals(2, updatedLegalAct.getLegalActTags().size());
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("firstTag")));
        assertTrue(updatedLegalAct.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals("secondTag")));
    }

    @Test
    void addMultipleTagsToLegalAct_ShouldThrowDbObjectNotFoundException_WhenLegalActNotFound() {
        //given
        Long legalActId = 1L;
        List<TagDTO> tags = Arrays.asList(new TagDTO("firstTag"), new TagDTO("secondTag"));

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.empty());

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.addMultipleTagsToLegalAct(legalActId, tags);
        });
        assertEquals("Legal act not found", exception.getMessage());
    }

    @Test
    void removeMultipleTagsFromLegalAct_ShouldRemoveExistingTagsSuccessfully() throws DbObjectNotFoundException {
        //given
        Long legalActId = 1L;
        List<TagDTO> tagsToRemove = Arrays.asList(new TagDTO("firstTag"), new TagDTO("secondTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);

        Tag tag1 = new Tag();
        tag1.setName("firstTag");
        LegalActTag legalActTag1 = new LegalActTag(legalAct, tag1, new Date());

        Tag tag2 = new Tag();
        tag2.setName("secondTag");
        LegalActTag legalActTag2 = new LegalActTag(legalAct, tag2, new Date());

        Set<LegalActTag> existingTags = new HashSet<>(Arrays.asList(legalActTag1, legalActTag2));
        legalAct.setLegalActTags(existingTags);

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));
        when(legalActRepository.save(any(LegalAct.class))).thenReturn(legalAct);

        //then
        LegalAct updatedLegalAct = legalActService.removeMultipleTagsFromLegalAct(legalActId, tagsToRemove);

        assertEquals(0, updatedLegalAct.getLegalActTags().size());
    }

    @Test
    void removeMultipleTagsFromLegalAct_ShouldThrowDbObjectNotFoundException_WhenSomeTagsNotFound() {
        //given
        Long legalActId = 1L;
        List<TagDTO> tagsToRemove = Arrays.asList(new TagDTO("firstTag"), new TagDTO("NonExistingTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);

        Tag tag1 = new Tag();
        tag1.setName("firstTag");
        LegalActTag legalActTag1 = new LegalActTag(legalAct, tag1, new Date());

        Set<LegalActTag> existingTags = new HashSet<>(Collections.singletonList(legalActTag1));
        legalAct.setLegalActTags(existingTags);

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.removeMultipleTagsFromLegalAct(legalActId, tagsToRemove);
        });
        assertEquals("Legal Act Tag not found", exception.getMessage());
    }

    @Test
    void removeMultipleTagsFromLegalAct_ShouldThrowDbObjectNotFoundException_WhenLegalActNotFound() {
        //given
        Long legalActId = 1L;
        List<TagDTO> tagsToRemove = Arrays.asList(new TagDTO("firstTag"));

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.empty());

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.removeMultipleTagsFromLegalAct(legalActId, tagsToRemove);
        });
        assertEquals("Legal act not found", exception.getMessage());
    }

    @Test
    void removeMultipleTagsFromLegalAct_ShouldThrowDbObjectNotFoundException_WhenTagNotFound() {
        //given
        Long legalActId = 1L;
        List<TagDTO> tagsToRemove = Arrays.asList(new TagDTO("NonExistingTag"));

        LegalAct legalAct = new LegalAct();
        legalAct.setId(legalActId);
        legalAct.setLegalActTags(new HashSet<>());

        //when
        when(legalActRepository.findById(legalActId)).thenReturn(Optional.of(legalAct));

        //then
        DbObjectNotFoundException exception = assertThrows(DbObjectNotFoundException.class, () -> {
            legalActService.removeMultipleTagsFromLegalAct(legalActId, tagsToRemove);
        });
        assertEquals("Legal Act Tag not found", exception.getMessage());
    }
}
