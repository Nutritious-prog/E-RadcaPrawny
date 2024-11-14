package com.jpwo.legalchatbot.service;


import com.jpwo.legalchatbot.exception.TagCreationException;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagService(final TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> getTags() {
        return tagRepository.findAll();
    }
    public Optional<Tag> getTag(final String name) {

        return tagRepository.findByName(name);

    }
    public Optional<Tag> getTagById(final Long id) {

        return tagRepository.findById(id);

    }

    public Tag createTag(final String name) throws TagCreationException {
        if (name == null) {
            throw new TagCreationException("Tag name cannot be null");
        }

        try {
            Tag tag = Tag.builder().name(name).createdAt(new Date()).build();
            return tagRepository.save(tag);
        } catch (Exception e) {
            throw new TagCreationException("Failed to create tag:" + e.getMessage());
        }
    }

    public Tag saveTag(Tag toUpdate) {
        return tagRepository.save(toUpdate);
    }
}
