package com.jpwo.legalchatbot.service;


import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.model.LegalAct;
import com.jpwo.legalchatbot.model.LegalActTag;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.model.dto.TagDTO;
import com.jpwo.legalchatbot.repository.LegalActRepository;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LegalActService {


    private static final Logger log = LoggerFactory.getLogger(LegalActService.class);
    final LegalActRepository legalActRepository;
    final TagService tagService;

    @Autowired
    public LegalActService(final LegalActRepository legalActRepository, final TagService tagService) {
        this.legalActRepository = legalActRepository;
        this.tagService = tagService;
    }

    public List<LegalAct> getLegalActs() {
        return legalActRepository.findAll();
    }

    public Optional<LegalAct> getLegalAct(final long id) {
        return legalActRepository.findById(id);
    }

    public LegalAct saveLegalAct(final LegalAct legalAct) {
        return legalActRepository.save(legalAct);
    }

    public LegalAct addTagToLegalAct(Long id, TagDTO tag) throws DbObjectNotFoundException {
        LegalAct toUpdate = getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));
        Tag tagToAdd = tagService.getTag(tag.getName()).orElse(null);

        if (tagToAdd == null) {
            tagToAdd = tagService.createTag(tag.getName());
        }

        if (toUpdate.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals(tag.getName()))) {
            return toUpdate;
        }

        LegalActTag legalActTag = new LegalActTag(toUpdate, tagToAdd, new Date());
        toUpdate.getLegalActTags().add(legalActTag);
        toUpdate.setModifiedAt(new Date());
        return saveLegalAct(toUpdate);
    }


    public LegalAct addMultipleTagsToLegalAct(Long id, List<TagDTO> tags) throws DbObjectNotFoundException {
        LegalAct toUpdate = getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));
        for (TagDTO tagDTO : tags) {
            Tag tagToAdd = tagService.getTag(tagDTO.getName()).orElse(null);

            if (tagToAdd == null) {
                tagToAdd = tagService.createTag(tagDTO.getName());
            }

            if (toUpdate.getLegalActTags().stream().anyMatch(legalActTag -> legalActTag.getTag().getName().equals(tagDTO.getName()))) {
                continue;
            }

            LegalActTag legalActTag = new LegalActTag(toUpdate, tagToAdd, new Date());

            toUpdate.getLegalActTags().add(legalActTag);
        }
        toUpdate.setModifiedAt(new Date());
        return saveLegalAct(toUpdate);
    }


    public LegalAct removeTagFromLegalAct(Long id, String tagName) throws DbObjectNotFoundException {

        LegalAct toUpdate = getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));

        // Initialize the collection to avoid lazy loading issues
        Hibernate.initialize(toUpdate.getLegalActTags());

        LegalActTag toRemove = toUpdate.getLegalActTags().stream()
                .filter(legalActTag -> legalActTag.getTag().getName().equals(tagName))
                .findFirst()
                .orElseThrow(() -> new DbObjectNotFoundException("Legal Act Tag not found"));


        Set<LegalActTag> tagsToKeep = toUpdate.getLegalActTags();
        tagsToKeep.remove(toRemove);
        toUpdate.setLegalActTags(tagsToKeep);
        toUpdate.setModifiedAt(new Date());
        return saveLegalAct(toUpdate);
    }

    public LegalAct removeMultipleTagsFromLegalAct(Long id, List<TagDTO> tags) throws DbObjectNotFoundException {
        LegalAct toUpdate = getLegalAct(id).orElseThrow(() -> new DbObjectNotFoundException("Legal act not found"));
        Set<LegalActTag> tagsToKeep = toUpdate.getLegalActTags();
        Hibernate.initialize(toUpdate.getLegalActTags());
        for (TagDTO tagDTO : tags) {
            LegalActTag toRemove = toUpdate.getLegalActTags().stream()
                    .filter(legalActTag -> legalActTag.getTag().getName().equals(tagDTO.getName()))
                    .findFirst()
                    .orElseThrow(() -> new DbObjectNotFoundException("Legal Act Tag not found"));
            tagsToKeep.remove(toRemove);
        }
        toUpdate.setLegalActTags(tagsToKeep);
        toUpdate.setModifiedAt(new Date());
        return saveLegalAct(toUpdate);

    }
}
