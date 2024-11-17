package com.jpwo.legalchatbot.model.ids;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class LegalActTagId implements Serializable {
    private Long legalActId;
    private Long tagId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LegalActTagId that = (LegalActTagId) o;
        return Objects.equals(legalActId, that.legalActId) &&
                Objects.equals(tagId, that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(legalActId, tagId);
    }
}
