package com.jpwo.legalchatbot.model.dto;

import lombok.Data;

@Data
public class TagDTO {
    private String name;

    public TagDTO(String name) {
        this.name = name;
    }
}