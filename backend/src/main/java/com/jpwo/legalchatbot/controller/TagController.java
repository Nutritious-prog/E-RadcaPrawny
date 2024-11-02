package com.jpwo.legalchatbot.controller;


import com.jpwo.legalchatbot.model.ApiResponse;
import com.jpwo.legalchatbot.model.Tag;
import com.jpwo.legalchatbot.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
