package com.jpwo.legalchatbot.service;


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

    public Tag createTag(final String name) {

        Tag tag = Tag.builder().name(name).createdAt(new Date()).build();
        return tagRepository.save(tag);

    }

    public Tag saveTag(Tag toUpdate) {
        return tagRepository.save(toUpdate);
    }
}
