package com.jpwo.legalchatbot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jpwo.legalchatbot.model.ids.LegalActTagId;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class LegalActTag {
    @EmbeddedId
    @JsonIgnore
    private LegalActTagId id;

    public LegalActTag(LegalAct legalAct, Tag tag, Date addedAt) {
        this.id = new LegalActTagId(legalAct.getId(), tag.getId());
        this.legalAct = legalAct;
        this.tag = tag;
        this.addedAt = addedAt;
    }

    @ManyToOne
    @MapsId("legalActId")
    @JoinColumn(name = "legal_act_id")
    @JsonBackReference
    private LegalAct legalAct;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Column(name = "added_at")
    private Date addedAt;




}
