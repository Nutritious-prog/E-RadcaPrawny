package com.jpwo.legalchatbot.model.dto;

import lombok.Data;

@Data
public class LegalActContentDTO {
    private String content;

    public LegalActContentDTO(String content) {
        this.content = content;
    }
}
