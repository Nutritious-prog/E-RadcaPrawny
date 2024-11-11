package com.jpwo.legalchatbot.controller;


import com.jpwo.legalchatbot.exception.DbObjectNotFoundException;
import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.model.dto.TagDTO;
import com.jpwo.legalchatbot.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/tags")
public class TagController {

    private final TagService tagService;

    @Autowired
    public TagController(final TagService tagService) {
        this.tagService = tagService;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Tag>>> getTags() {

        List<Tag> tags = tagService.getTags();
        ApiResponse<List<Tag>> apiResponse = new ApiResponse<>(true, tags, "Tags found successfully");
        return ResponseEntity.ok(apiResponse);

    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ApiResponse<Tag>> updateTag(@PathVariable final Long id, @RequestBody final TagDTO tag) throws DbObjectNotFoundException {

        Tag toUpdate = tagService.getTagById(id).orElseThrow(() -> new DbObjectNotFoundException("Tag not found"));
        toUpdate.setName(tag.getName());
        toUpdate.setModifiedAt(new Date());
        toUpdate = tagService.saveTag(toUpdate);
        ApiResponse<Tag> apiResponse = new ApiResponse<>(true, toUpdate, "Tag updated successfully");
        return ResponseEntity.ok(apiResponse);

    }



}
