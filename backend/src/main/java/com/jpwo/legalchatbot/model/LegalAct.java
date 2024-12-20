package com.jpwo.legalchatbot.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jpwo.legalchatbot.model.ids.LegalActTagId;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
public class LegalAct {
    @Id
    @SequenceGenerator(
            name = "legal_act_sequence",
            sequenceName = "legal_act_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "legal_act_sequence"
    )
    private Long id;

    @Column(nullable = false)
    @Size(min = 2, max = 50, message = "Legal act title needs to be between [2,50] characters")
    private String title;

    @Column(name = "text_content", columnDefinition = "TEXT")
    private String textContent;

    @OneToMany(mappedBy = "legalAct", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<LegalActTag> legalActTags = new HashSet<>();


    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "modified_at")
    private Date modifiedAt;

    public void updateTo(LegalAct newLegalAct) {
        this.title = newLegalAct.getTitle();
        this.textContent = newLegalAct.getTextContent();
        this.modifiedAt = new Date();

        // Clear and rebuild tags
        this.legalActTags.clear();
        if (newLegalAct.getLegalActTags() != null) {
            for (LegalActTag tag : newLegalAct.getLegalActTags()) {
                tag.setLegalAct(this); // Set back-reference
                if (tag.getId() == null) {
                    tag.setId(new LegalActTagId(this.getId(), tag.getTag().getId()));
                }
                this.legalActTags.add(tag);
            }
        }
    }

}
