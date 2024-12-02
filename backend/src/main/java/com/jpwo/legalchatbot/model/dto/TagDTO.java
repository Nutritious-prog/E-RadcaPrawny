package com.jpwo.legalchatbot.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TagDTO {
    private String name;

    public TagDTO(String name) {
        this.name = name;
    }
}
